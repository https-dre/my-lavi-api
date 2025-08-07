import { FastifyRequest, FastifyReply } from "fastify";
import { IOwnerRepository } from "../repositories";
import { OwnerModel } from "../models";
import * as bcrypt from "bcryptjs";
import { decrypt, encrypt, sha256 } from "../crypt-core";
import { logger } from "../logger";

export class OwnerController {
  constructor(readonly repository: IOwnerRepository) {}

  public async save(req: FastifyRequest, reply: FastifyReply) {
    let new_owner = req.body as {
      name: string;
      email: string;
      password: string;
      cpf: string;
      cep: string;
      birth_date: string;
    };

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
      name: new_owner.name,
      email: encrypt(new_owner.email!),
      email_sha256: email_hash,
      cpf: encrypt(new_owner.cpf!),
      cpf_sha256: cpf_hash,
      cep: encrypt(new_owner.cep!),
      birth_date: new_owner.birth_date!,
      password: new_password,
    };

    const owner_created = await this.repository.save(crypted_onwer);

    logger.info(decrypt(owner_created.email!));

    return reply.code(201).send({ details: "Owner created!", owner_created });
  }
}
