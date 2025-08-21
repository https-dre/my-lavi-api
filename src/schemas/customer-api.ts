import z from "zod";
import { ZodCustomer } from "../dto/zod-schemas";

export const create_customer = {
  summary: "Create a customer",
  tags: ["customer"],
  body: z.object({
    customer: ZodCustomer.omit({ id: true, created_at: true }),
  }),
  response: {
    201: z.object({
      customer_id: z.string().uuid(),
    }),
  },
};

export const auth_customer = {
  summary: "Authenticate a customer by password",
  tags: ["customer"],
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response: {
    200: z.object({
      details: z.string(),
      token: z.string(),
    }),
  },
};

export const update_customer = {
  summary: "Update fields of customer",
  tags: ["customer"],
  headers: z.object({
    Authorization: z.string().startsWith("Bearer ")
  }),
  body: z.object({
    fields: ZodCustomer.omit({
      id: true,
      created_at: true,
      password: true,
    }).partial(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
};
