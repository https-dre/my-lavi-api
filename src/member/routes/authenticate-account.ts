import Elysia from "elysia";
import { AccountService } from "../account.service";

export const authenticateAccount = (service: AccountService): Elysia => {
  return new Elysia().put("/");
};
