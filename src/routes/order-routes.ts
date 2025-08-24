import { FastifyInstance } from "fastify";
import { OrderRepository } from "../repositories/order-repository";
import { OrderService } from "../services/order-service";
import { OrderController } from "../controller/order-controller";
import {
  createOrder,
  deleteOrder,
  updateOrderStatus,
} from "../schemas/order-api";
import { LaundryRepository } from "../repositories/laundry-repository";
import { CustomerRepository } from "../repositories/customer-repository";

export const order_router = (app: FastifyInstance) => {
  const orderRepository = new OrderRepository();
  const service = new OrderService(
    orderRepository,
    new CustomerRepository(),
    new LaundryRepository()
  );
  const controller = new OrderController(service);

  app.post(
    "/orders",
    { schema: createOrder },
    controller.createOrder.bind(controller)
  );

  app.delete(
    "/orders/:id",
    { schema: deleteOrder },
    controller.deleteOrder.bind(controller)
  );

  app.put(
    "/order/status/:id",
    { schema: updateOrderStatus },
    controller.updateOrderStatus.bind(controller)
  );
};
