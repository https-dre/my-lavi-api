import { CustomerModel } from "../models";

export interface ICustomerRepository {
  save(data: Omit<CustomerModel, "id">): Promise<void>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<CustomerModel>;
  findById(id: string): Promise<CustomerModel>;
}