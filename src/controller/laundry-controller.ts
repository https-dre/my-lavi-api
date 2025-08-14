import { FastifyReply, FastifyRequest } from "fastify";
import { LaundryService } from "../services/laundry-service";
import z from "zod";
import { create_laundry, get_laundry } from "../schemas/laundry-api";

export class LaundryController {
  constructor(private service: LaundryService) {}

  async save(req: FastifyRequest, reply: FastifyReply) {
    const { laundry } = req.body as z.infer<typeof create_laundry.body>;
    const laundry_id = await this.service.save(laundry);
    return reply
      .code(201)
      .send({ details: "Lavanderia cadastrada!", laundry_id });
  }

  async getByIdOrCNPJ(req: FastifyRequest, reply: FastifyReply) {
    const { key } = req.params as z.infer<typeof get_laundry.params>;
    const laundry = await this.service.find(key);
    return reply.code(200).send(laundry);
  }
}
