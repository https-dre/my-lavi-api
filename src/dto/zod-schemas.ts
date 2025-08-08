import z from "zod";

export const ZodOwner = z.object({
  id: z.string(),
  name: z.string(),
  cpf: z.string(),
  verified: z.boolean(),
  email: z.string(),
  password: z.string(),
  birth_date: z.string(),
  cep: z.string()
});