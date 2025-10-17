import { ILaundryRepository } from "../shared/repositories";
import { db } from "../database/conn";
import { LaundryModel } from "../shared/models";
import t from "../database/tables";
import { randomUUID } from "crypto";
import { eq, ilike } from "drizzle-orm";

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

  async findByEmployeeCode(code: string): Promise<LaundryModel> {
    const result = await db
      .select()
      .from(t.laundry)
      .where(eq(t.laundry.putEmployeeCode, code));
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
      .where(eq(t.laundry.cnpj_blind_index, cnpj));
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

  async searchByName(name: string): Promise<LaundryModel[]> {
    const result: LaundryModel[] = await db
      .select()
      .from(t.laundry)
      .where(ilike(t.laundry.name, `%${name}%`));
    return result;
  }

  async listAll(): Promise<LaundryModel[]> {
    const result: LaundryModel[] = await db.select().from(t.laundry);
    return result;
  }
}
