import {
  text,
  pgTable,
  varchar,
  integer,
  numeric,
  char,
  boolean,
  timestamp
} from "drizzle-orm/pg-core";

export const owner = pgTable("owner", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }),
  cpf: char({ length: 11 }).unique(),
  verified: boolean().default(false),
  email: text().unique(),
  birth_date: text(),
  cep: char({ length: 8 }),
});

export const laundry = pgTable("laundry", {
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
  type: text(),
  created_at: timestamp().defaultNow(),
  ownerId: text().references(() => owner.id),
});

export const laundryBanner = pgTable("laundryBanner", {
  id: text().primaryKey(),
  resource: text(),
  laundryId: text().references(() => laundry.id)
});

export const employee = pgTable("employee", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }),
  cpf: char({ length: 11 }).unique(),
  email: varchar().unique(),
  password: text(),
  laundryId: text().references(() => laundry.id),
});

export const customer = pgTable("customer", {
  id: text().primaryKey(),
  profile_url: text(),
  name: text(),
  email: text().unique().notNull(),
  is_pj: boolean().default(false),
  document: varchar({ length: 14 }),
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
  customerId: text().references(() => customer.id)
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
  orderId: text().references(() => order.id)
});

export const feedbackPost = pgTable("feedbackPost", {
  id: text().primaryKey(),
  content: text().notNull(),
  rate: integer(),
  created_at: timestamp().defaultNow(),
  laundryId: text().references(() => laundry.id)
});

export const feedbackImage = pgTable("feedbackImage", {
  id: text().primaryKey(),
  url: text().notNull(),
  postId: text().references(() => feedbackPost.id)
})

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
  feedbackImage
}

export default tables;