// Data Transfer Object
import { RemoveSha256Fields } from '../functions/remove-sensitive-fields';
import { CustomerModel, OwnerModel } from '../models';

export type OwnerDTO = RemoveSha256Fields<OwnerModel>;

export type CustomerDTO = RemoveSha256Fields<CustomerModel>;