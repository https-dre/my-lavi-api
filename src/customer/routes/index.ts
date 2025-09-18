import {
  CryptoProvider,
  JwtProvider,
} from "../../shared/providers/crypto-provider";
import { IdentityService } from "../../shared/services/identity-service";
import { OwnerRepository } from "../../owner/owner-repository";
import { CustomerRepository } from "../customer-repository";
import { CustomerService } from "../customer-service";
import Elysia from "elysia";
import { postCustomer } from "./post-customer";
import { deleteCustomer } from "./delete-customer";
import { getCustomer } from "./get-customer";
import { updateCustomer } from "./update-customer";
import { authenticateCustomer } from "./authenticate-customer";
import { listCustomers } from "./list-customers";

const customerRepository = new CustomerRepository();
const ownerRepository = new OwnerRepository();
const cryptoProvider = new CryptoProvider();
const jwtProvider = new JwtProvider();
const identityService = new IdentityService(
  customerRepository,
  ownerRepository,
);
const customerService = new CustomerService(
  customerRepository,
  cryptoProvider,
  jwtProvider,
  identityService,
);

const customerController = new Elysia()
  .use(postCustomer(customerService))
  .use(deleteCustomer(customerService))
  .use(getCustomer(customerService))
  .use(updateCustomer(customerService))
  .use(authenticateCustomer(customerService))
  .use(listCustomers(customerService));

export { customerController };
