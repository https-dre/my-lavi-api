import Elysia from "elysia";
import { CustomerRepository } from "../../customer/customer-repository";
import {
  CryptoProvider,
  JwtProvider,
} from "../../shared/providers/crypto-provider";
import { IdentityService } from "../../shared/services/identity-service";
import { OwnerRepository } from "../owner-repository";
import { OwnerService } from "../owner-service";

import { postOwner } from "./post-owner";
import { getOwner } from "./get-owner";
import { deleteOwner } from "./delete-owner";
import { listOwners } from "./list-owners";
import { authenticateOwner } from "./authenticate-owner";

const ownerRepository = new OwnerRepository();
const jwtProvider = new JwtProvider();
const cryptoProvider = new CryptoProvider();
const customerRepository = new CustomerRepository();

const ownerService = new OwnerService(
  ownerRepository,
  cryptoProvider,
  jwtProvider,
  new IdentityService(customerRepository, ownerRepository)
);

// CONFIGURA AS ROTAS PARA 'OWNER'
const ownerController = new Elysia()
  .use(postOwner(ownerService))
  .use(getOwner(ownerService))
  .use(deleteOwner(ownerService))
  .use(listOwners(ownerService))
  .use(authenticateOwner(ownerService));

export { ownerController };
