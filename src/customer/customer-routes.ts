import { FastifyInstance } from "fastify";
import { CustomerRepository } from "./customer-repository";
import { CustomerController } from "./customer-controller";
import {
  auth_customer,
  create_customer,
  update_customer,
} from "./customer-api";
import { CustomerService } from "./customer-service";
import {
  CryptoProvider,
  JwtProvider,
} from "../shared/providers/crypto-provider";
import { OwnerRepository } from "../owner/owner-repository";
import { IdentityService } from "../shared/services/identity-service";

export const customer_routes = (app: FastifyInstance) => {
  const customerRepository = new CustomerRepository();
  const ownerRepository = new OwnerRepository();
  const identityService = new IdentityService(
    customerRepository,
    ownerRepository,
  );
  const customerService = new CustomerService(
    customerRepository,
    new CryptoProvider(),
    new JwtProvider(),
    identityService,
  );
  const customerController = new CustomerController(customerService);

  app.post(
    "/customer",
    { schema: create_customer },
    customerController.save.bind(customerController),
  );

  app.post(
    "/customer/sign",
    { schema: auth_customer },
    customerController.auth.bind(customerController),
  );

  app.put(
    "/customer/update",
    {
      schema: update_customer,
      preHandler: customerController.preHandler.bind(customerController),
    },
    customerController.update.bind(customerController),
  );
};
