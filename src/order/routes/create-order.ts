import Elysia, { t } from "elysia";
import { OrderService } from "../order-service";
import { OrderType } from "../../shared/dto/typebox";

export const createOrder = (service: OrderService): Elysia => {
  return new Elysia().post(
    "/orders",
    async ({ body, status }) => {
      const { order } = body;
      const result = await service.createOrder(order);
      return status(201, { order: result });
    },
    {
      detail: {
        summary: "Create order",
        tags: ["orders"],
      },
      body: t.Object({
        order: t.Omit(OrderType, ["id", "created_at", "updated_at"]),
      }),
      response: {
        201: t.Object({
          order: OrderType,
        }),
      },
    },
  );
};
