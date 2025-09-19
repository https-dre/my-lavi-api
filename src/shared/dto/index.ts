// Data Transfer Object
import { CustomerModel, LaundryModel, OwnerModel } from "../models";
import { CustomerType, LaundryType, OrderType, OwnerType } from "./typebox";

export type OwnerDTO = typeof OwnerType.static;

export type CustomerDTO = typeof CustomerType.static;

export type LaundryDTO = typeof LaundryType.static;

export type OrderDTO = typeof OrderType.static;
