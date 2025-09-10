import { FastifyInstance } from "fastify";
import { OwnerRepository } from "./owner-repository";
import { OwnerController } from "./owner-controller";
import { auth_owner, create_owner, get_owner } from "./owner-api";
import { OwnerService } from "./owner-service";
import {
  CryptoProvider,
  JwtProvider,
} from "../shared/providers/crypto-provider";
import { IdentityService } from "../shared/services/identity-service";
import { CustomerRepository } from "../customer/customer-repository";

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

  const controller = new OwnerController(ownerService);

  app.post(
    "/owners",
    { schema: create_owner },
    controller.save.bind(controller)
  );

  app.put(
    "/owners/auth",
    { schema: auth_owner },
    controller.ownerLogin.bind(controller)
  );

  app.get(
    "/owners/:id",
    { schema: get_owner },
    controller.getOwner.bind(controller)
  );

  app.delete(
    "/owners/:id",
    {
      schema: {
        summary: "Delete owner",
        tags: ["owner"],
      },
    },
    controller.deleteWithId.bind(controller)
  );

  if (process.env.ROUTE_MODE !== "production") {
    app.get(
      "/public/onwers",
      {
        schema: {
          tags: ["owner"],
          summary: "List all owners",
        },
      },
      controller.listAllIds.bind(controller)
    );
  }
};
