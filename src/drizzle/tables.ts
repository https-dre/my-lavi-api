import {
  text,
  pgTable,
  varchar,
  integer,
  numeric,
  char,
} from "drizzle-orm/pg-core";

export const laundryTable = pgTable("laundry", {
  id: text().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  address: text(),
  opening: varchar({ length: 30 }).default("."),
  longitude: numeric(),
  latitude: numeric(),
  cnpj: char({ length: 18 }).unique(),
  bank_code: text(),
  bank_agency: integer(),
  account_number: text().unique(),
  account_type: text(),
  fk_owner_id: text(),
});
