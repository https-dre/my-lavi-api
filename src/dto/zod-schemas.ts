import z from "zod";

export const ZodOwner = z.object({
  id: z.string().uuid(),
  name: z.string(),
  cpf: z.string().length(11),
  verified: z.boolean(),
  email: z.string().email(),
  password: z.string(),
  birth_date: z.string(),
  cep: z.string().length(8)
});