import {
  text,
  pgTable,
  varchar,
  integer,
  numeric,
  char,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const laundryTable = pgTable("laundry", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  address: text(),
  opening: varchar({ length: 30 }).default("."),
  longitude: numeric(),
  latitude: numeric(),
  cnpj: char({ length: 14 }).unique(),
  bank_code: text(),
  bank_agency: integer(),
  account_number: text().unique(),
  account_type: text(),
  created_at: timestamp().defaultNow(),
  fk_owner_id: text(),
});

export const ownerTable = pgTable("owner", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }),
  cpf: char({ length: 11 }).unique(),
  verified: boolean().default(false),
  email: text().unique(),
  birth_date: text(),
  cep: char({ length: 8 }),
});

export const employeeTable = pgTable("employee", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }),
  cpf: char({ length: 11 }).unique(),
  email: varchar().unique(),
  password: text(),
  fk_laundry_id: text(),
});

export const customerTable = pgTable("customer", {
  id: text().primaryKey(),
  name: text(),
  email: text().unique().notNull(),
  is_pj: boolean().default(false),
  document: varchar({ length: 14 }),
  birth_date: text(),
  gender: text(),
  password: text(),
  created_at: timestamp().defaultNow(),
});

export const orderTable = pgTable("order", {
  id: text().primaryKey(),
  created_at: timestamp().defaultNow(),
  description: text(),
  status: text(),
  type: text(),
  qntd: text(),
  latitude: numeric(),
  longitude: numeric(),
  fk_laundry_id: text().notNull(),
  fk_user_id: text().notNull(),
});

export const transactionTable = pgTable("transaction", {
  id: text().primaryKey(),
  created_at: timestamp().defaultNow(),
  method: text().default("pix"),
  transaction_hash: text(),
  amount_paid: integer(), // in cents
  payment_status: text(),
  fk_order_id: text(),
});
