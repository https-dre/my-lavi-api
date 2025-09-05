import z from "zod";

const zCreatedAt = z.preprocess((val) => new Date(val as string), z.date());

export const ZodOwner = z.object({
  id: z.string().uuid(),
  profile_url: z.string().url().nullable().optional(),
  name: z.string(),
  cpf: z.string().length(11),
  verified: z.boolean(),
  email: z.string().email(),
  password: z.string(),
  birth_date: z.string(),
  cep: z.string().length(8),
  created_at: zCreatedAt,
});

export const ZodCustomer = z.object({
  id: z.string().uuid(),
  profile_url: z.string().url().nullable().optional(),
  name: z.string(),
  email: z.string().email(),
  is_pj: z.boolean(),
  doc: z.string().max(14).min(11),
  birth_date: z.string(),
  gender: z.string(),
  password: z.string(),
  created_at: zCreatedAt,
});

const numericSchema = z.string().regex(/^-?\d+(\.\d+)?$/);

export const ZodLaundry = z.object({
  id: z.string().uuid(),
  name: z.string(),
  profile_url: z.string().url().nullable().optional(),
  cnpj: z.string(),
  address: z.string(),
  latitude: numericSchema,
  longitude: numericSchema,
  bank_code: z.string(),
  bank_agency: z.string(),
  account_number: z.string(),
  account_type: z.string(),
  type: z.string(),
  created_at: zCreatedAt,
  ownerId: z.string().uuid(),
});

export const PrivateZodLaundry = ZodLaundry.omit({
  bank_code: true,
  bank_agency: true,
  account_number: true,
  account_type: true,
  /* ownerId: true, */
});

export const ZodOrderItem = z.object({
  id: z.string().uuid(),
  qntd: z.coerce.number(),
  unitPrice_inCents: z.coerce.number(),
  name: z.string(),
  service: z.string(),
  orderId: z.string(),
});

export const ZodOrder = z.object({
  id: z.string().uuid(),
  created_at: zCreatedAt,
  updated_at: zCreatedAt.optional().nullable(),
  details: z.string(),
  status: z.string(),
  delivery_type: z.string(),
  latitude: numericSchema,
  longitude: numericSchema,
  laundryId: z.string().uuid(),
  customerId: z.string().uuid(),
  orderItems: z.array(ZodOrderItem).nullable().optional(),
});
