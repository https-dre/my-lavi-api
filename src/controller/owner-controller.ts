import { FastifyRequest, FastifyReply } from "fastify";
import { IOwnerRepository } from "../repositories";
import { OwnerModel } from "../models";
import * as bcrypt from "bcryptjs";
import { decrypt, encrypt, sha256 } from "../crypt-core";
import { logger } from "../logger";
import { OwnerDTO } from "../dto";
import jwt from 'jsonwebtoken';
import z from "zod";
import { ZodOwner } from "../dto/zod-schemas";
import { create_owner } from "../schemas/owner-api";

export class OwnerController {
  constructor(readonly repository: IOwnerRepository) {}

  public async save(req: FastifyRequest, reply: FastifyReply) {
    const { owner } = req.body as z.infer<typeof create_owner.body>;

    let new_owner = owner;

    if(new_owner.cpf.includes(".") || new_owner.cep.includes("-")) {
      return reply.code(400).send({ details: "CEP e CPF devem conter apenas números."})
    }

    const cpf_hash = sha256(new_owner.cpf!);
    const owner_with_cpf = await this.repository.findByCpf(cpf_hash);

    if (owner_with_cpf) {
      return reply
        .code(400)
        .send({ details: "Este CPF já existe no sistema." });
    }

    const email_hash = sha256(new_owner.email!);
    const owner_with_email = await this.repository.findByEmail(
      sha256(new_owner.email!)
    );

    if (owner_with_email) {
      return reply.code(400).send({ details: "E-mail já foi cadastrado." });
    }

    const SALT_ROUNDS = 10;
    const new_password = bcrypt.hashSync(
      new_owner.password as string,
      SALT_ROUNDS
    );

    const crypted_onwer = {
      ...new_owner,
      email: encrypt(new_owner.email!),
      email_sha256: email_hash,
      cpf: encrypt(new_owner.cpf!),
      cpf_sha256: cpf_hash,
      cep: encrypt(new_owner.cep!),
      password: new_password,
    };

    const owner_created = await this.repository.save(crypted_onwer);

    return reply.code(201).send({ details: "Owner created!", owner_id: owner_created.id });
  }

  public async auth(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as { email: string, password: string }

    const owner_founded = await this.repository
      .findByEmail(sha256(email));

    if (!owner_founded) {
      return reply.code(404).send({ details: "Nenhum dono encontrado!"});
    }

    const auth_result = bcrypt.compareSync(password, owner_founded.password);

    if(!auth_result) {
      return reply.code(403).send({ details: "Login ou e-mail incorretos."});
    }

    const payload = {
      email
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: "1h"
    });

    return reply.code(200).send({ details: "authenticated with success", token });
  }
}
