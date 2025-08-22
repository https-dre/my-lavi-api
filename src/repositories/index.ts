import {
  CustomerModel,
  LaundryModel,
  OwnerModel,
  LaundryBannerModel,
} from "../models";

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

export interface ILaundryRepository {
  save(data: Omit<LaundryModel, "id">): Promise<LaundryModel>;
  delete(id: string): Promise<void>;
  findByCNPJ(cnpj: string): Promise<LaundryModel>;
  findById(id: string): Promise<LaundryModel>;
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
