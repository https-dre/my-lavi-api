import {
  text,
  pgTable,
  varchar,
  integer,
  numeric,
  char,
  boolean,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const owner = pgTable("owner", {
  id: text().primaryKey(),
  profile_url: text(),
  name: varchar().notNull(),
  cpf: text().notNull(),
  cpf_blind_index: text().notNull().unique(),
  verified: boolean().default(false),
  email: text().notNull(),
  email_blind_index: text().unique(),
  password: text().notNull(),
  birth_date: date().notNull(),
  cep: text().notNull(),
  created_at: timestamp().defaultNow(),
});

export const laundry = pgTable("laundry", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  address: text(),
  opening: varchar({ length: 30 }).default("."),
  longitude: numeric(),
  latitude: numeric(),
  cnpj_blind_index: text().unique(),
  cnpj: text().unique(),
  bank_code: text(),
  bank_agency: text(),
  account_number: text().unique(),
  account_type: text(),
  type: text(),
  created_at: timestamp().defaultNow(),
  ownerId: text().references(() => owner.id),
});

export const laundryBanner = pgTable("laundryBanner", {
  id: text().primaryKey(),
  resource: text(),
  resource_key: text(),
  laundryId: text().references(() => laundry.id),
});

export const employee = pgTable("employee", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }),
  cpf_blind_index: text().unique(),
  cpf: char({ length: 11 }).unique(),
  email_blind_index: text().unique(),
  email: varchar().unique(),
  password: text(),
  laundryId: text().references(() => laundry.id),
});

export const customer = pgTable("customer", {
  id: text().primaryKey(),
  profile_url: text(),
  name: text(),
  email_blind_index: text().notNull().unique(),
  email: text().notNull(),
  is_pj: boolean().default(false),
  doc_blind_index: text().notNull().unique(),
  doc: text().notNull(),
  birth_date: text(),
  gender: text(),
  password: text(),
  created_at: timestamp().defaultNow(),
});

export const customerAddress = pgTable("customerAddress", {
  id: text().primaryKey(),
  name: text(),
  latitude: numeric(),
  longitude: numeric(),
  customerId: text().references(() => customer.id),
});

export const order = pgTable("order", {
  id: text().primaryKey(),
  created_at: timestamp().defaultNow(),
  description: text(),
  status: text(),
  type: text(),
  details: text(),
  latitude: numeric(),
  longitude: numeric(),
  laundryId: text().references(() => laundry.id),
  customerId: text().references(() => customer.id),
});

export const orderItem = pgTable("orderItem", {
  id: text().primaryKey(),
  name: text(),
  services: text(),
  orderId: text().references(() => order.id),
});

export const feedbackPost = pgTable("feedbackPost", {
  id: text().primaryKey(),
  content: text().notNull(),
  rate: integer(),
  created_at: timestamp().defaultNow(),
  laundryId: text().references(() => laundry.id),
});

export const feedbackImage = pgTable("feedbackImage", {
  id: text().primaryKey(),
  url: text().notNull(),
  postId: text().references(() => feedbackPost.id),
});

const tables = {
  owner,
  laundry,
  laundryBanner,
  employee,
  customer,
  customerAddress,
  order,
  orderItem,
  feedbackPost,
  feedbackImage,
};

export default tables;
