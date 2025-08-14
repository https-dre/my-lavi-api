import z from "zod";

export const ZodOwner = z.object({
  id: z.string().uuid(),
  profile_url: z.string().url().optional(),
  name: z.string(),
  cpf: z.string().length(11),
  verified: z.boolean(),
  email: z.string().email(),
  password: z.string(),
  birth_date: z.string(),
  cep: z.string().length(8),
  created_at: z.string(),
});

export const ZodCustomer = z.object({
  id: z.string().uuid(),
  profile_url: z.string().url().optional(),
  name: z.string(),
  email: z.string().email(),
  is_pj: z.boolean(),
  doc: z.string().max(14).min(11),
  birth_date: z.string(),
  gender: z.string(),
  password: z.string(),
  created_at: z.string(),
});

const numericSchema = z.string().regex(/^-?\d+(\.\d+)?$/);

export const ZodLaundry = z.object({
  id: z.string().uuid(),
  name: z.string(),
  profile_url: z.string().url().optional(),
  cnpj: z.string(),
  address: z.string(),
  latitude: numericSchema,
  longitude: numericSchema,
  bank_code: z.string(),
  bank_agency: z.string(),
  account_number: z.string(),
  account_type: z.string(),
  type: z.string(),
  created_at: z.preprocess((val) => new Date(val as string), z.date()),
  ownerId: z.string().uuid(),
});

export const PrivateZodLaundry = ZodLaundry.omit({
  bank_code: true,
  bank_agency: true,
  account_number: true,
  account_type: true,
  ownerId: true,
});
