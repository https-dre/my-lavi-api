import z from "zod";
import { PrivateZodLaundry, ZodLaundry } from "../dto/zod-schemas";

export const create_laundry = {
  summary: "Create a laundry",
  tags: ["laundry"],
  body: z.object({
    laundry: ZodLaundry.omit({ id: true, created_at: true }),
  }),
  response: {
    201: z.object({
      details: z.string(),
      laundry_id: z.string().uuid(),
    }),
  },
};

export const get_laundry = {
  summary: "Get a laundry",
  tags: ["laundry"],
  description: "Use Id or CNPJ",
  params: z.object({
    key: z.string(),
  }),
  response: {
    200: PrivateZodLaundry,
  },
};
