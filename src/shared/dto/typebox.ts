import { Type } from "@sinclair/typebox";
import { t } from "elysia";

const DateISO = Type.Transform(t.Date())
  .Decode((value) => value.toISOString())
  .Encode((value) => new Date(value));

export const OwnerType = Type.Object({
  id: Type.String(),
  profile_url: Type.Union([Type.String(), Type.Null()]),
  name: Type.String(),
  cpf: Type.String(),
  verified: Type.Boolean(),
  email: Type.String(),
  password: Type.String(),
  birth_date: DateISO,
  cep: Type.String(),
  created_at: Type.Union([DateISO, Type.Null()]),
});

export const CustomerType = Type.Object({
  id: Type.String(),
  profile_url: Type.Union([Type.String(), Type.Null()]),
  name: Type.String(),
  email: Type.String(),
  is_pj: Type.Boolean(),
  doc: Type.String(),
  birth_date: DateISO,
  gender: Type.String(),
  password: Type.String(),
  created_at: DateISO,
});

export const LaundryType = Type.Object({
  id: Type.String(),
  name: Type.String(),
  profile: Type.Union([Type.String(), Type.Null()]),
  cnpj: Type.String(),
  address: Type.String(),
  latitude: Type.String(),
  longitude: Type.String(),
  bank_code: Type.String(),
  bank_agency: Type.String(),
  account_number: Type.String(),
  account_type: Type.String(),
  type: Type.String(),
  created_at: DateISO,
  onwerId: Type.String(),
});

export const OrderItemType = Type.Object({
  id: Type.String(),
  qntd: Type.Integer(),
  unitPrice_inCents: Type.Integer(),
  name: Type.String(),
  service: Type.String(),
  orderId: Type.String(),
});

export const OrderType = Type.Object({
  id: Type.String(),
  created_at: DateISO,
  updated_at: Type.Union([DateISO, Type.Null()]),
  details: Type.String(),
  status: Type.String(),
  delivery_type: Type.String(),
  latitude: Type.String(),
  longitude: Type.String(),
  laundryId: Type.String(),
  customerId: Type.String(),
});
