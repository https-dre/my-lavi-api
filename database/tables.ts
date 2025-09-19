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
  verified: boolean().default(false).notNull(),
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
  profile_url: text(),
  address: text().notNull(),
  opening: text().notNull(),
  longitude: numeric().notNull(),
  latitude: numeric().notNull(),
  cnpj_blind_index: text().unique(),
  cnpj: text().unique().notNull(),
  bank_code: text().notNull(),
  bank_agency: text().notNull(),
  account_number: text().unique().notNull(),
  account_type: text().notNull(),
  type: text().notNull(),
  created_at: timestamp().defaultNow(),
  ownerId: text()
    .references(() => owner.id, { onDelete: "cascade" })
    .notNull(),
});

export const laundryBanner = pgTable("laundryBanner", {
  id: text().primaryKey(),
  resource: text(),
  resource_key: text(),
  laundryId: text().references(() => laundry.id, { onDelete: "cascade" }),
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
  name: text().notNull(),
  email_blind_index: text().notNull().unique(),
  email: text().notNull(),
  is_pj: boolean().default(false).notNull(),
  doc_blind_index: text().notNull().unique(),
  doc: text().notNull(),
  birth_date: date().notNull(),
  gender: text().notNull(),
  password: text().notNull(),
  created_at: timestamp().defaultNow(),
});

export const customerAddress = pgTable("customerAddress", {
  id: text().primaryKey(),
  name: text(),
  latitude: numeric(),
  longitude: numeric(),
  customerId: text().references(() => customer.id, { onDelete: "cascade" }),
});

export const order = pgTable("order", {
  id: text().primaryKey(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  status: text().notNull(),
  delivery_type: text().notNull(),
  details: text().notNull(),
  latitude: numeric().notNull(),
  longitude: numeric().notNull(),
  laundryId: text()
    .references(() => laundry.id, { onDelete: "set null" })
    .notNull(),
  customerId: text()
    .references(() => customer.id, { onDelete: "set null" })
    .notNull(),
});

export const orderItem = pgTable("orderItem", {
  id: text().primaryKey(),
  qntd: integer(),
  unitPrice_inCents: integer(),
  name: text(),
  service: text(),
  orderId: text().references(() => order.id, { onDelete: "cascade" }),
});

export const feedbackPost = pgTable("feedbackPost", {
  id: text().primaryKey(),
  content: text().notNull(),
  rate: integer(),
  created_at: timestamp().defaultNow(),
  laundryId: text().references(() => laundry.id, { onDelete: "cascade" }),
  customerId: text().references(() => customer.id, { onDelete: "cascade" }),
});

export const feedbackImage = pgTable("feedbackImage", {
  id: text().primaryKey(),
  url: text().notNull(),
  postId: text().references(() => feedbackPost.id, { onDelete: "cascade" }),
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
