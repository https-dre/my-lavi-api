import { FastifyInstance } from "fastify";
import { OwnerRepository } from "../repositories/owner-repository";
import { OwnerController } from "../controller/owner-controller";
import { auth_owner, create_owner } from "../schemas/owner-api";
import { OwnerService } from "../services/owner-service";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";
import { IdentityService } from "../services/identity-service";
import { CustomerRepository } from "../repositories/customer-repository";

export const owner_routes = (app: FastifyInstance) => {
  const ownerRepository = new OwnerRepository();
  const customerRepository = new CustomerRepository();
  const identityService = new IdentityService(
    customerRepository,
    ownerRepository
  );
  const ownerService = new OwnerService(
    ownerRepository,
    new CryptoProvider(),
    new JwtProvider(),
    identityService
  );

  const ownerController = new OwnerController(ownerService);

  app.post(
    "/owners",
    { schema: create_owner },
    ownerController.save.bind(ownerController)
  );

  app.put(
    "/owners/auth",
    { schema: auth_owner },
    ownerController.auth.bind(ownerController)
  );
};
