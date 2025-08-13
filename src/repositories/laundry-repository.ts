import { ILaundryRepository } from ".";
import { db } from "../drizzle/conn";
import { LaundryModel } from "../models";
import t from "../drizzle/tables.ts";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class LaundryRepository implements ILaundryRepository {
  async save(data: Omit<LaundryModel, "id">): Promise<LaundryModel> {
    const result = await db
      .insert(t.laundry)
      .values({
        id: randomUUID(),
        ...data,
      })
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(t.laundry).where(eq(t.laundry.id, id));
  }

  async findById(id: string): Promise<LaundryModel> {
    const result = await db
      .select()
      .from(t.laundry)
      .where(eq(t.laundry.id, id));
    return result[0];
  }

  async findByCNPJ(cnpj: string): Promise<LaundryModel> {
    const result = await db
      .select()
      .from(t.laundry)
      .where(eq(t.laundry.cnpj_hash, cnpj));
    return result[0];
  }

  async findByOwnerId(id: string): Promise<LaundryModel[]> {
    const result = await db
      .select()
      .from(t.laundry)
      .where(eq(t.laundry.ownerId, id));
    return result;
  }

  async update(id: string, fields: Record<string, any>): Promise<void> {
    await db.update(t.laundry).set(fields).where(eq(t.laundry.id, id));
  }
}
