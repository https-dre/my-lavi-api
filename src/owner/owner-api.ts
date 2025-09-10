import z from "zod";
import { ZodOwner } from "../shared/dto/zod-schemas";

export const create_owner = {
  summary: "Create owner",
  tags: ["owner"],
  body: z.object({
    owner: ZodOwner.omit({ id: true, verified: true, created_at: true }),
  }),
  response: {
    201: z.object({
      details: z.string(),
      owner_id: z.string().uuid(),
    }),
  },
};

export const auth_owner = {
  summary: "Authenticate owner by password",
  tags: ["owner"],
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response: {
    200: z.object({
      token: z.string().jwt(),
      owner_id: z.string().uuid(),
      details: z.string(),
    }),
  },
};

export const get_owner = {
  summary: "Find owner by id",
  tags: ["owner"],
  params: z.object({
    id: z.string().uuid(),
  }),
  response: {
    200: z.object({
      details: z.string(),
      owner: ZodOwner.omit({ password: true }),
    }),
  },
};
