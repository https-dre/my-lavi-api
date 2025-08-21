// Data Transfer Object
import { RemoveSensitiveFields } from "../functions/remove-sensitive-fields";
import { CustomerModel, LaundryModel, OwnerModel } from "../models";

export type OwnerDTO = RemoveSensitiveFields<OwnerModel>;

export type CustomerDTO = RemoveSensitiveFields<CustomerModel>;

export type LaundryDTO = RemoveSensitiveFields<LaundryModel>;

