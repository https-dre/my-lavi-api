// Data Transfer Object
import z from "zod";
import { RemoveSensitiveFields } from "../functions/remove-sensitive-fields";
import { CustomerModel, LaundryModel, OwnerModel } from "../models";
import { ZodOrder } from "./zod-schemas";

export type OwnerDTO = RemoveSensitiveFields<OwnerModel>;

export type CustomerDTO = RemoveSensitiveFields<CustomerModel>;

export type LaundryDTO = RemoveSensitiveFields<LaundryModel>;

export type OrderDTO = z.infer<typeof ZodOrder>;
