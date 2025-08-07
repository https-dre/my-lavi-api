import { FastifyRequest, FastifyReply } from "fastify";
import { ICustomerRepository } from "../repositories/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../logger";
import { CustomerModel } from "../models";
import { encrypt, sha256 } from "../crypt-core";

export class CustomerController {
  constructor(readonly repository: ICustomerRepository) {}

  public async save(req: FastifyRequest, reply: FastifyReply) {
    const customer = req.body as Required<
      Omit<
        CustomerModel,
        "id" & "email_sha256" & "doc_sha256" & "created_at" & "profile_url"
      >
    >;

    const { email, doc } = customer;

    const email_hash = sha256(email);

    const customer_with_email = await this.repository.findByEmail(email_hash);

    if (customer_with_email) {
      return reply
        .code(400)
        .send({ details: "E-mail já cadastrado na plataforma! " });
    }

    const doc_hash = sha256(doc);

    // const customer_with_doc = await this.repository.findByDoc(doc_hash);

    const encrypted_customer = {
      ...customer,
      email_sha256: email_hash,
      email: encrypt(email),
      doc_sha256: doc_hash,
      doc: encrypt(doc),
      name: encrypt(customer.name!),
    };

    const customer_created = await this.repository.save(encrypted_customer);

    return reply
      .code(201)
      .send({ details: "Cliente criado!", customer_created });
  }

  public async authByPassword(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;

    const customerFounded = await this.repository.findByEmail(email);

    if (!customerFounded) {
      return reply.code(404).send({ details: "customer not found!" });
    }

    bcrypt.compare(password, customerFounded.password!, (err, result) => {
      if (err || !result) {
        reply.code(403).send({ details: "password incorrect" });
      }

      const payload = {
        email,
      };

      const token = jwt.sign(payload, process.env.JWT_KEY!, {
        expiresIn: "1h",
      });

      return reply
        .code(200)
        .send({ status: "authenticated with success!", token });
    });

    logger.info("Erro na validação da requisição de autenticação!");
    return reply.code(400).send("ERROR! Contact the system administrator!");
  }
}

