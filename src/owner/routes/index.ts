import Elysia from "elysia";
import { CustomerRepository } from "../../customer/customer-repository";
import { CryptoProvider, JwtProvider } from "../../shared/providers/crypto-provider";
import { IdentityService } from "../../shared/services/identity-service";
import { OwnerRepository } from "../owner-repository";
import { OwnerService } from "../owner-service";
import { createOwner } from "./create-onwer";

const ownerRepository = new OwnerRepository();
const customerRepository = new CustomerRepository();
const ownerService = new OwnerService(ownerRepository, new CryptoProvider, new JwtProvider, new IdentityService(customerRepository, ownerRepository));

const ownerRouter = new Elysia({ prefix: "/owner" });
ownerRouter.use(createOwner);

export { ownerRouter, ownerService };