import { IOrderRepository } from ".";
import { db } from "../drizzle/conn";
import { OrderItemModel, OrderModel } from "../models";
import * as t from "../drizzle/tables.ts";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";

export class OrderRepository implements IOrderRepository {
  async create(data: Omit<OrderModel, "id">): Promise<OrderModel> {
    const result = await db
      .insert(t.order)
      .values({
        ...data,
        id: randomUUID(),
      })
      .returning();
    return result[0];
  }

  async delete(orderId: string): Promise<void> {
    await db.delete(t.order).where(eq(t.order.id, orderId));
  }

  async findById(id: string): Promise<OrderModel> {
    const result = await db.select().from(t.order).where(eq(t.order.id, id));
    return result[0];
  }

  async findByCustomerIdAndStatus(
    customerId: string,
    status: string
  ): Promise<OrderModel[]> {
    const result = await db
      .select()
      .from(t.order)
      .where(
        and(eq(t.order.customerId, customerId), eq(t.order.status, status))
      );

    return result;
  }

  async findByCustomerId(id: string): Promise<OrderModel[]> {
    return await db.select().from(t.order).where(eq(t.order.customerId, id));
  }

  async pushOrderItem(
    item: Omit<OrderItemModel, "id">
  ): Promise<OrderItemModel> {
    const result = await db
      .insert(t.orderItem)
      .values({
        id: randomUUID(),
        ...item,
      })
      .returning();
    return result[0];
  }

  async pushManyOrderItems(
    items: Omit<OrderItemModel, "id">[]
  ): Promise<OrderItemModel[]> {
    const data = items.map((item) => ({ id: randomUUID(), ...item }));
    const result = await db.insert(t.orderItem).values(data).returning();
    return result;
  }

  async deleteOrderItem(itemId: string): Promise<void> {
    await db.delete(t.orderItem).where(eq(t.orderItem.id, itemId));
  }

  async deleteAllItemsFromOrder(id: string): Promise<void> {
    await db.delete(t.orderItem).where(and(eq(t.orderItem.orderId, id)));
  }

  async updateFields(
    orderId: string,
    fields: Partial<Omit<OrderModel, "id" | "created_at" | "updated_at">>
  ): Promise<void> {
    await db
      .update(t.order)
      .set({
        updated_at: new Date(),
        ...fields,
      })
      .where(eq(t.order.id, orderId));
  }
}
