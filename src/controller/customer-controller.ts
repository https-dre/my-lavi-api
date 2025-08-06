import { FastifyRequest, FastifyReply } from "fastify";
import { ICustomerRepository } from '../repositories/index';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logger } from "../logger";

export class CustomerController {
  constructor(readonly repository: ICustomerRepository) {}

  public async authByPassword(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;

    const customerFounded = await this.repository.findByEmail(email);

    if (!customerFounded) {
      return reply.code(404).send({ details: "customer not found!"});
    }

    bcrypt.compare(password, customerFounded.password!, (err, result) => {
      if (err || !result) {
        reply.code(403).send({ details: "password incorrect"})
      }

      const payload = {
        email
      }

      const token = jwt.sign(payload, process.env.JWT_KEY!, {
        expiresIn: '1h'
      });
      
      return reply.code(200).send({ status: "authenticated with success!", token});
    });

    logger.info("Erro na validação da requisição de autenticação!")
    return reply.code(400).send("ERROR! Contact the system administrator!")
  }

  public async save(req: FastifyRequest, reply: FastifyReply) {
    
  }
}