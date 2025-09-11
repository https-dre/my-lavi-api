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
import z from "zod";

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
  const controller = new CustomerController(customerService);

  app.post(
    "/customer",
    { schema: create_customer },
    controller.save.bind(controller),
  );

  app.put(
    "/customer/sign",
    { schema: auth_customer },
    controller.auth.bind(controller),
  );

  app.put(
    "/customer/update",
    {
      schema: update_customer,
      preHandler: controller.preHandler.bind(controller),
    },
    controller.update.bind(controller),
  );

  app.delete(
    "/customer/:id",
    {
      schema: {
        summary: "Delete customer",
        tags: ["customer"],
        response: {
          204: z.null(),
        },
      },
    },
    controller.deleteWithId.bind(controller),
  );

  app.get(
    "/customer/:id",
    { schema: { summary: "Find customer", tags: ["customer"] } },
    controller.getCustomerWithId.bind(controller),
  );

  if (process.env.ROUTE_MODE !== "production") {
    app.get(
      "/customers",
      {
        schema: {
          tags: ["customer"],
          summary: "List all customers",
        },
      },
      controller.listAllIds.bind(controller),
    );
  }
};
