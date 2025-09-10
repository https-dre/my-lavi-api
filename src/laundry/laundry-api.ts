import z from "zod";
import { PrivateZodLaundry, ZodLaundry } from "../shared/dto/zod-schemas";

export const create_laundry = {
  summary: "Create laundry",
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
  summary: "Get laundry",
  tags: ["laundry"],
  description: "Use Id or CNPJ",
  params: z.object({
    key: z.string(),
  }),
  response: {
    200: PrivateZodLaundry,
  },
};

export const get_laundry_for_owner = {
  summary: "Get laundry for Owner",
  tags: ["laundry"],
  params: z.object({
    id: z.string().uuid(),
  }),
  response: {
    200: z.object({
      laundry: ZodLaundry,
    }),
  },
};

export const search_laundries_by_name = {
  summary: "Search laundries by name",
  tags: ["laundry"],
  params: z.object({
    name: z.string().optional().nullable(),
  }),
  response: {
    200: z.object({
      laundries: z.array(ZodLaundry),
    }),
  },
};
