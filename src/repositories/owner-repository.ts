import { randomUUID } from "crypto";
import { IOwnerRepository } from ".";
import { db } from "../drizzle/conn";
import tables from "../drizzle/tables";
import { OwnerModel } from "../models";
import { eq } from "drizzle-orm";

export class OwnerRepository implements IOwnerRepository {
  public async save(data: Omit<OwnerModel, "id">): Promise<OwnerModel> {
    const new_owner = await db
      .insert(tables.owner)
      .values({
        id: randomUUID(),
        ...data,
      })
      .returning();

    return new_owner[0];
  }

  public async delete(id: string): Promise<void> {
    await db.delete(tables.owner).where(eq(tables.owner.id, id));
  }

  public async findByEmail(email: string): Promise<OwnerModel> {
    const result = await db
      .select()
      .from(tables.owner)
      .where(eq(tables.owner.email_blind_index, email));

    return result[0];
  }

  public async findById(id: string): Promise<OwnerModel> {
    const result = await db
      .select()
      .from(tables.owner)
      .where(eq(tables.owner.id, id));

    return result[0];
  }

  public async update(
    updates: Partial<Omit<OwnerModel, "id">>,
    id: string
  ): Promise<void> {
    await db.update(tables.owner).set(updates).where(eq(tables.owner.id, id));
  }

  public async findByCpf(cpf: string): Promise<OwnerModel> {
    const result: OwnerModel[] = await db
      .select()
      .from(tables.owner)
      .where(eq(tables.owner.cpf_blind_index, cpf));

    return result[0];
  }
}
