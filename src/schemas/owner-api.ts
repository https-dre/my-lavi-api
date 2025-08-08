import z from "zod";
import { ZodOwner } from "../dto/zod-schemas";

export const create_owner = {
  summary: "Create a owner",
  body: z.object({
    owner: ZodOwner.omit({ id: true})
  }),
  response: {
    201: z.object({
      details: z.string(),
      owner_id: z.string().uuid()
    })
  }
}