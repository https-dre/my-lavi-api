import { FastifyReply, FastifyRequest } from "fastify";
import { OwnerService } from "./owner-service";
import z from "zod";
import { auth_owner, create_owner } from "./owner-api";

export class OwnerController {
  constructor(readonly service: OwnerService) {}

  async save(req: FastifyRequest, reply: FastifyReply) {
    const { owner } = req.body as z.infer<typeof create_owner.body>;
    const saved_owner = await this.service.saveOwner(owner);
    return reply.code(201).send({
      details: "Cadastro realizado com sucesso!",
      owner_id: saved_owner.id,
    });
  }

  async ownerLogin(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as z.infer<typeof auth_owner.body>;
    const payload = await this.service.ownerLogin(email, password);
    return reply.code(200).send({
      details: "Autenticado com sucesso!",
      token: payload.token,
      owner_id: payload.owner_id,
    });
  }

  async preHandler(req: FastifyRequest, reply: FastifyReply) {
    const header = req.headers["Authorization"] as string;
    if (!header.startsWith("Bearer "))
      return reply.code(401).send({
        details: "Sessão inválida.",
        err: "Header 'Authorization' must start with 'Bearer '",
      });
    const token = header.split(" ")[1];
    const payload = await this.service.checkJwt(token);
    req.contextData = { token, jwtPayload: payload };
  }

  async getPublicOwnerData(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const owner = await this.service.findOwner(id);
    return reply.code(200).send({
      details: "Registro encontrado",
      owner: {
        id: owner.id,
        name: owner.name,
        profile_url: owner.profile_url,
      },
    });
  }

  async getOwner(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const owner = await this.service.findOwner(id);
    return reply.code(200).send({ details: "Registro encontrado.", owner });
  }
}
