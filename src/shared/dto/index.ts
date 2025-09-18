// Data Transfer Object
import z from "zod";
import { RemoveSensitiveFields } from "../functions/remove-sensitive-fields";
import { CustomerModel, LaundryModel, OwnerModel } from "../models";
import { ZodOrder } from "./zod-schemas";
import { CustomerType, LaundryType, OwnerType } from "./typebox";

export type OwnerDTO = typeof OwnerType.static;

export type CustomerDTO = typeof CustomerType.static;

export type LaundryDTO = typeof LaundryType.static;

export type OrderDTO = z.infer<typeof ZodOrder>;
