// Data Transfer Object
import { RemoveHashFields } from "../functions/remove-sensitive-fields";
import { CustomerModel, LaundryModel, OwnerModel } from "../models";

export type OwnerDTO = RemoveHashFields<OwnerModel>;

export type CustomerDTO = RemoveHashFields<CustomerModel>;

export type LaundryDTO = RemoveHashFields<LaundryModel>;

