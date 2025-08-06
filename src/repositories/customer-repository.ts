import { randomUUID } from "crypto";
import { ICustomerRepository } from ".";
import { db } from "../drizzle/conn";
import tables from "../drizzle/tables";
import { CustomerModel } from "../models";
import { eq } from "drizzle-orm";

export class CustomerRepository implements ICustomerRepository {
  public async save(data: Omit<CustomerModel, "id">): Promise<void> {
    db.insert(tables.customer).values({
      id: randomUUID(),
      ...data
    })
  }

  public async findByEmail(email: string): Promise<CustomerModel> {
    const result: CustomerModel[] = await db
      .select()
      .from(tables.customer).where(eq(tables.customer.id, email));

    return result[0];
  }

  public async findById(id: string): Promise<CustomerModel> {
    const result: CustomerModel[] = await db
      .select()
      .from(tables.customer).where(eq(tables.customer.id, id))

    return result[0]
  }

  public async delete(id: string): Promise<void>
  {
    await db.delete(tables.customer).where(eq(tables.customer.id, id));
  }
}