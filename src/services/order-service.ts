import { BadResponse } from "../error-handler";
import { OrderItemModel, OrderModel } from "../models";
import {
  ICustomerRepository,
  ILaundryRepository,
  IOrderRepository,
} from "../repositories";

export class OrderService {
  constructor(
    private repository: IOrderRepository,
    private customerRepository: ICustomerRepository,
    private laundryRepository: ILaundryRepository
  ) {}

  async createOrder(
    orderData: Required<Omit<OrderModel, "id" | "created_at">>
  ) {
    if (!(await this.customerRepository.findById(orderData.customerId!)))
      throw new BadResponse("Cliente não encontrado.", 404);
    if (!(await this.laundryRepository.findById(orderData.laundryId!)))
      throw new BadResponse("Lavanderia não encontrada.", 404);

    const orderCreated = await this.repository.create(orderData);
    return orderCreated;
  }

  async deleteOrder(orderId: string) {
    await this.repository.deleteAllItemsFromOrder(orderId);
    await this.repository.delete(orderId);
  }

  async pushOrderItems(items: Omit<OrderItemModel, "id">[]) {
    const itemsCreated = await this.repository.pushManyOrderItems(items);
    return itemsCreated;
  }
}
