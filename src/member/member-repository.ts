import { MemberModel } from "../shared/models";
import { IMemberRepository } from "@/shared/repositories";
import { db } from "@/database/conn";
import * as t from "@/database/tables";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class MemberRepository implements IMemberRepository {
  async save(
    data: Omit<MemberModel, "id" | "created_at">,
  ): Promise<MemberModel> {
    const result = await db
      .insert(t.member)
      .values({
        ...data,
        id: randomUUID(),
      })
      .returning();
    return result[0];
  }
  async findById(id: string): Promise<MemberModel> {
    const result = await db.select().from(t.member).where(eq(t.member.id, id));
    return result[0];
  }
  async findByEmail(email: string): Promise<MemberModel> {
    const result = await db
      .select()
      .from(t.member)
      .where(eq(t.member.email_blind_index, email));
    return result[0];
  }
  async findByCpf(cpf: string): Promise<MemberModel> {
    const result = await db
      .select()
      .from(t.member)
      .where(eq(t.member.cpf_blind_index, cpf));
    return result[0];
  }
  async deleteById(id: string): Promise<void> {
    await db.delete(t.member).where(eq(t.member.id, id));
  }

  async updateFields(
    id: string,
    fields: Partial<Omit<MemberModel, "id" | "created_at">>,
  ) {
    await db.update(t.member).set(fields).where(eq(t.member.id, id));
  }

  async findByLaundryId(id: string): Promise<MemberModel[]> {
    return await db.select().from(t.member).where(eq(t.member.laundryId, id));
  }
}
