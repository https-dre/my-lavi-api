import { AccountModel } from "../shared/models";
import { db } from "../../database/conn";
import * as t from "../../database/tables";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { IAccountRepository } from "../shared/repositories";

export class AccountRepository implements IAccountRepository {
  async save(
    data: Omit<AccountModel, "id" | "created_at">
  ): Promise<AccountModel> {
    const result = await db
      .insert(t.account)
      .values({
        ...data,
        id: randomUUID(),
      })
      .returning();
    return result[0];
  }
  async findById(id: string): Promise<AccountModel> {
    const result = await db
      .select()
      .from(t.account)
      .where(eq(t.account.id, id));
    return result[0];
  }
  async findByEmail(email: string): Promise<AccountModel> {
    const result = await db
      .select()
      .from(t.account)
      .where(eq(t.account.email_blind_index, email));
    return result[0];
  }
  async findByCpf(cpf: string): Promise<AccountModel> {
    const result = await db
      .select()
      .from(t.account)
      .where(eq(t.account.cpf_blind_index, cpf));
    return result[0];
  }
  async deleteById(id: string): Promise<void> {
    await db.delete(t.account).where(eq(t.account.id, id));
  }
  async updateFields(
    id: string,
    fields: Partial<Omit<AccountModel, "id" | "created_at">>
  ) {
    await db.update(t.account).set(fields).where(eq(t.account.id, id));
  }
}
