import { CustomerModel, OwnerModel } from "../models";

export interface ICustomerRepository {
  save(data: Omit<CustomerModel, "id">): Promise<CustomerModel>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<CustomerModel>;
  findById(id: string): Promise<CustomerModel>;
  update(
    updates: Partial<Omit<CustomerModel, "id">>,
    id: string
  ): Promise<void>;
  findByDoc(doc: string): Promise<CustomerModel>;
}

export interface IOwnerRepository {
  save(data: Omit<OwnerModel, "id">): Promise<OwnerModel>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<OwnerModel>;
  findById(id: string): Promise<OwnerModel>;
  findByCpf(cpf: string): Promise<OwnerModel>;
  update(updates: Partial<Omit<OwnerModel, "id">>, id: string): Promise<void>;
}
