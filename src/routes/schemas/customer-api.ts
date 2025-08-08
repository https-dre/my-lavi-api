import z from "zod";
import { ZodCustomer } from "../../dto/zod-schemas";

export const create_customer = {
  summary: "Create a customer",
  body: z.object({
    customer: ZodCustomer.omit({ id: true, created_at: true })
  }),
  response: {
    201: z.object({
      customer_id: z.string().uuid()     
    })
  }
}