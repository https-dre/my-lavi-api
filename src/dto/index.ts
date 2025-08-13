// Data Transfer Object
import { RemoveHashFields } from '../functions/remove-sensitive-fields';
import { CustomerModel, OwnerModel } from '../models';

export type OwnerDTO = RemoveHashFields<OwnerModel>;

export type CustomerDTO = RemoveHashFields<CustomerModel>;