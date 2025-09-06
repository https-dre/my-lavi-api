import z from "zod";
import { ZodOrder } from "../shared/dto/zod-schemas";

const authHeaders = z.object({ Authorization: z.string().jwt() });

export const createOrder = {
  summary: "Create order",
  headers: authHeaders,
  tags: ["order"],
  body: z.object({
    order: ZodOrder.omit({
      id: true,
      created_at: true,
      orderItems: true,
      updated_at: true,
    }),
  }),
};

export const getOrder = {
  summary: "Find order by id",
  headers: authHeaders,
  tags: ["order"],
  params: z.object({
    id: z.string().uuid(),
  }),
};

export const updateOrderStatus = {
  summary: "Update order status with Id",
  headers: authHeaders,
  tags: ["order"],
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    new_status: z.string(),
  }),
};

export const deleteOrder = {
  summary: "Delete order with Id",
  headers: authHeaders,
  tags: ["order"],
  params: z.object({
    id: z.string().uuid(),
  }),
};
