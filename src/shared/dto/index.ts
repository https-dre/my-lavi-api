// Data Transfer Object
import {
  AccountType,
  CustomerType,
  LaundryType,
  OrderType
} from "./typebox";

export type CustomerDTO = typeof CustomerType.static;

export type LaundryDTO = typeof LaundryType.static;

export type OrderDTO = typeof OrderType.static;

export type AccountDTO = typeof AccountType.static;
