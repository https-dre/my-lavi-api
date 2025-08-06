import tables from './drizzle/tables';

export type CustomerModel = typeof tables.customer.$inferInsert;