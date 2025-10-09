// Data Transfer Object
import {
  MemberType,
  CustomerType,
  LaundryType,
  OrderType,
  CatalogItemType,
} from "./typebox";

export type CustomerDTO = typeof CustomerType.static;

export type LaundryDTO = typeof LaundryType.static;

export type OrderDTO = typeof OrderType.static;

export type MemberDTO = typeof MemberType.static;

export type CatalogItemDTO = typeof CatalogItemType.static;
