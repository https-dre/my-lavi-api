import z from "zod";
import { ZodOwner } from "../dto/zod-schemas";

export const create_owner = {
  summary: "Create a owner",
  tags: ["owner"],
  body: z.object({
    owner: ZodOwner.omit({ id: true, verified: true, created_at: true })
  }),
  response: {
    201: z.object({
      details: z.string(),
      owner_id: z.string().uuid()
    })
  }
}

export const auth_owner = {
  summary: "Authenticate owner by password",
  tags: ["owner"],
  body: z.object({
    email: z.string().email(),
    password: z.string()
  }),
  response: {
    200: z.object({
      token: z.string().jwt(),
      details: z.string()
    })
  }
}