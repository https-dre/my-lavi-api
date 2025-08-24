import { FastifyReply, FastifyRequest } from "fastify";
import { OrderService } from "../services/order-service";
import {
  createOrder,
  deleteOrder,
  updateOrderStatus,
} from "../schemas/order-api";
import z from "zod";

export class OrderController {
  constructor(private service: OrderService) {}

  async createOrder(req: FastifyRequest, reply: FastifyReply) {
    const { order } = req.body as z.infer<typeof createOrder.body>;
    const orderCreated = await this.service.createOrder(order);
    return reply
      .code(201)
      .send({ details: "Pedido registrado.", order_id: orderCreated.id });
  }

  async updateOrderStatus(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as z.infer<typeof updateOrderStatus.params>;
    const { new_status } = req.body as z.infer<typeof updateOrderStatus.body>;
    await this.service.updateStatus(id, new_status);
    return reply.code(200).send({ details: "Status do pedido atualizado." });
  }

  async deleteOrder(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as z.infer<typeof deleteOrder.params>;
    await this.service.deleteOrder(id);
    return reply.code(204).send();
  }
}
