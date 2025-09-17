import { BadResponse } from "../../http/error-handler";
import { OrderItemModel, OrderModel } from "../shared/models";
import {
  ICustomerRepository,
  ILaundryRepository,
  IOrderRepository,
} from "../shared/repositories";

export class OrderService {
  constructor(
    private repository: IOrderRepository,
    private customerRepository: ICustomerRepository,
    private laundryRepository: ILaundryRepository
  ) {}

  async createOrder(
    orderData: Required<Omit<OrderModel, "id" | "created_at" | "updated_at">>
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

  async updateStatus(orderId: string, status: string) {
    if (!(await this.repository.findById(orderId)))
      throw new BadResponse("Pedido não encontrado.", 404);
    await this.repository.updateFields(orderId, { status });
  }

  async getOrdersByCustomerId(customerId: string) {
    if (!(await this.customerRepository.findById(customerId)))
      throw new BadResponse("Conta de cliente não encontrada.");

    const orders = await this.repository.findByCustomerId(customerId);
    return orders;
  }

  async getOrderItems(orderId: string) {
    if (!(await this.repository.findById(orderId)))
      throw new BadResponse("Pedido não encontrado.");

    return await this.repository.findOrderItemsByOrderId(orderId);
  }

  async getOrdersWithInterval(
    customerId: string,
    startDate: Date,
    endDate: Date
  ) {
    if (!(await this.customerRepository.findById(customerId)))
      throw new BadResponse("Cliente não encontrado.", 404);

    return await this.repository.findByCustomerIdWithDateInterval(
      customerId,
      startDate,
      endDate
    );
  }
}
