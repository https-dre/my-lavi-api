import { FastifyReply, FastifyRequest } from "fastify";
import { CustomerService } from "../services/customer-service";
import z from "zod";
import {
  auth_customer,
  create_customer,
  update_customer,
} from "../schemas/customer-api";

export class CustomerController {
  constructor(readonly service: CustomerService) {}

  public async save(req: FastifyRequest, reply: FastifyReply) {
    const { customer } = req.body as z.infer<typeof create_customer.body>;
    const id = await this.service.createCustomer(customer);
    return reply
      .code(201)
      .send({ details: "Cadastrado com sucesso!", customer_id: id });
  }

  public async auth(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as z.infer<typeof auth_customer.body>;
    const jwt = await this.service.authCustomer(email, password);
    return reply
      .code(200)
      .send({ details: "Autenticado com sucesso!", token: jwt });
  }

  public async update(req: FastifyRequest, reply: FastifyReply) {
    const { fields } = req.body as z.infer<typeof update_customer.body>;
    const { id } = req.params as { id: string };
    const customer_id = await this.service.updateCustomer(id, fields);
    return reply.code(202).send({ details: "Atualizado com sucesso!" });
  }

  public async preHandler(req: FastifyRequest, reply: FastifyReply) {
    const auth_header = req.headers["Authorization"] as string;
    if (!auth_header?.startsWith("Bearer "))
      return reply.code(400).send({
        details: "Não autorizado.",
        err: "Header 'Authorization' must be defined.",
      });
    const token = auth_header.split(" ")[1];
    req.contextData = { token };
    const payload = await this.service.checkAuth(token);
    req.contextData.jwtPayload = { email: payload.email };
  }
}
