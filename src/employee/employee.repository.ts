import { db } from "../../database/conn";
import { EmployeeModel } from "../shared/models";
import { IEmployeeRepository } from "../shared/repositories";
import * as t from "../../database/tables";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class EmployeeRepository implements IEmployeeRepository {
  async save(data: Omit<EmployeeModel, "id">): Promise<EmployeeModel> {
    const result = await db
      .insert(t.employee)
      .values({
        ...data,
        id: randomUUID(),
      })
      .returning();
    return result[0];
  }

  async findByEmail(email: string): Promise<EmployeeModel> {
    const result = await db
      .select()
      .from(t.employee)
      .where(eq(t.employee.email_blind_index, email));
    return result[0];
  }

  async findById(id: string): Promise<EmployeeModel> {
    const result = await db
      .select()
      .from(t.employee)
      .where(eq(t.employee.id, id));
    return result[0];
  }

  async deleteWithId(id: string): Promise<void> {
    await db.delete(t.employee).where(eq(t.employee.id, id));
  }
}
