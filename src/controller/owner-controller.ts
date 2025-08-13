import { FastifyReply, FastifyRequest } from "fastify";
import { OwnerService } from "../services/owner-service";
import z from "zod";
import { auth_owner, create_owner } from "../schemas/owner-api";

export class OwnerController {
  constructor(readonly service: OwnerService) {};

  async save(req: FastifyRequest, reply: FastifyReply) {
    const { owner } = req.body as z.infer<typeof create_owner.body>;
    const saved_owner = await this.service.saveOwner(owner);
    return reply.code(201).send({ 
      details: "Cadastro realizado com sucesso!",
      owner_id: saved_owner.id
    });
  }

  async auth(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as z.infer<typeof auth_owner.body>;
    const token = await this.service.authenticateOwner(email, password);
    return reply.code(200).send({ 
      details: "Autenticado com sucesso!",
      token
    }) 
  }
}