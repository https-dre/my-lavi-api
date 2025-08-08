import { FastifyRequest, FastifyReply } from "fastify";
import { ICustomerRepository } from "../repositories/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../logger";
import { CustomerModel } from "../models";
import { encrypt, sha256 } from "../crypt-core";
import { create_customer } from "../schemas/customer-api";
import z from "zod";

export class CustomerController {
  constructor(readonly repository: ICustomerRepository) {}

  public async save(req: FastifyRequest, reply: FastifyReply) {
    const { customer } = req.body as z.infer<typeof create_customer.body>;

    const { email, doc } = customer;

    const email_hash = sha256(email);

    const customer_with_email = await this.repository.findByEmail(email_hash);

    if (customer_with_email) {
      return reply
        .code(400)
        .send({ details: "E-mail já cadastrado na plataforma! " });
    }

    const doc_hash = sha256(doc);

    const customer_with_doc = await this.repository.findByDoc(doc_hash);

    if (customer_with_doc) {
      return reply.code(400).send({ details: "CPF já cadastrado!" });
    }

    if (customer.is_pj && customer.doc.length != 14) {
      return reply.code(400).send({
        details: `Em casos de pessoa jurídica, o CNPJ deve conter exatamente 14 caracteres`,
        field: "CNPJ",
      });
    }

    const new_password = bcrypt.hashSync(customer.password, 10);

    const encrypted_customer = {
      ...customer,
      email_sha256: email_hash,
      email: encrypt(email),
      doc_sha256: doc_hash,
      doc: encrypt(doc),
      name: encrypt(customer.name!),
      password: new_password,
    };

    const customer_created = await this.repository.save(encrypted_customer);

    return reply.code(201).send({ customer_id: customer_created.id });
  }

  public async authByPassword(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;

    const customerFounded = await this.repository.findByEmail(sha256(email));

    if (!customerFounded) {
      return reply.code(404).send({ details: "customer not found!" });
    }

    const result = bcrypt.compareSync(password, customerFounded.password!);

    if (!result) {
      return reply.code(403).send({ details: "Senha ou e-mail incorretos." });
    }

    const payload = {
      email,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: "1h",
    });

    return reply
      .code(200)
      .send({ details: "Autenticado com sucesso!", token });
  }
}
