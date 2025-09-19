import {
  CustomerModel,
  LaundryModel,
  OwnerModel,
  LaundryBannerModel,
  OrderModel,
  OrderItemModel,
  EmployeeModel,
} from "../models";

export interface ICustomerRepository {
  save(data: Omit<CustomerModel, "id">): Promise<CustomerModel>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<CustomerModel>;
  findById(id: string): Promise<CustomerModel>;
  update(
    updates: Partial<Omit<CustomerModel, "id">>,
    id: string,
  ): Promise<void>;
  findByDoc(doc: string): Promise<CustomerModel>;
  listAllIds(): Promise<{ id: string }[]>;
}

export interface IOwnerRepository {
  save(data: Omit<OwnerModel, "id" | "created_at">): Promise<OwnerModel>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<OwnerModel>;
  findById(id: string): Promise<OwnerModel>;
  findByCpf(cpf: string): Promise<OwnerModel>;
  update(updates: Partial<Omit<OwnerModel, "id">>, id: string): Promise<void>;
  listAllIds(): Promise<{ id: string }[]>;
}

export interface IEmployeeRepository {
  save(data: Omit<EmployeeModel, "id">): Promise<EmployeeModel>;
  findByEmail(email: string): Promise<EmployeeModel>;
  findById(id: string): Promise<EmployeeModel>;
  deleteWithId(id: string): Promise<void>;
}

export interface ILaundryRepository {
  save(data: Omit<LaundryModel, "id">): Promise<LaundryModel>;
  delete(id: string): Promise<void>;
  findByCNPJ(cnpj: string): Promise<LaundryModel>;
  findById(id: string): Promise<LaundryModel>;
  findByEmployeeCode(code: string): Promise<LaundryModel>;
  findByOwnerId(id: string): Promise<LaundryModel[]>;
  update(id: string, fields: Record<string, any>): Promise<void>;
  searchByName(name: string): Promise<LaundryModel[]>;
  listAll(): Promise<LaundryModel[]>;
}

export interface ILaundryBannerRepository {
  save(data: Omit<LaundryBannerModel, "id">): Promise<LaundryBannerModel>;
  delete(id: string): Promise<void>;
  findByLaundryId(id: string): Promise<LaundryBannerModel[]>;
  findById(id: string): Promise<LaundryBannerModel>;
}

export interface IOrderRepository {
  create(
    data: Omit<OrderModel, "id" | "created_at" | "updated_at">,
  ): Promise<OrderModel>;
  delete(orderId: string): Promise<void>;
  findByCustomerId(id: string): Promise<OrderModel[]>;
  findByCustomerIdWithCursorIndex(
    id: string,
    cursor: Date,
  ): Promise<OrderModel[]>;
  findById(id: string): Promise<OrderModel>;
  findByCustomerIdWithDateInterval(
    id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<OrderModel[]>;
  findByCustomerIdAndStatus(
    customerId: string,
    status: string,
  ): Promise<OrderModel[]>;
  pushOrderItem(item: Omit<OrderItemModel, "id">): Promise<OrderItemModel>;
  pushManyOrderItems(
    items: Omit<OrderItemModel, "id">[],
  ): Promise<OrderItemModel[]>;
  deleteOrderItem(itemId: string): Promise<void>;
  deleteAllItemsFromOrder(id: string): Promise<void>;
  findOrderItemsByOrderId(orderId: string): Promise<OrderItemModel[]>;
  findOrderItemById(id: string): Promise<OrderItemModel>;
  updateFields(
    orderId: string,
    fields: Partial<Omit<OrderModel, "id" | "created_at" | "updated_at">>,
  ): Promise<void>;
}
