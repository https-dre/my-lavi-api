import { FastifyInstance } from "fastify";
import {
  create_laundry,
  get_laundry,
  get_laundry_for_owner,
} from "./laundry-api";
import { LaundryService } from "./laundry-service";
import { LaundryRepository } from "./laundry-repository";
import { OwnerRepository } from "../owner/owner-repository";
import { CryptoProvider } from "../shared/providers/crypto-provider";
import { LaundryController } from "./laundry-controller";

export const laundry_routes = (app: FastifyInstance) => {
  const laundryRepository = new LaundryRepository();
  const ownerRepository = new OwnerRepository();
  const laundryService = new LaundryService(laundryRepository, ownerRepository);
  const controller = new LaundryController(laundryService);

  app.post(
    "/laundry",
    { schema: create_laundry },
    controller.save.bind(controller),
  );

  app.get(
    "/laundry/:key",
    { schema: get_laundry },
    controller.getByIdOrCNPJ.bind(controller),
  );

  app.get(
    "/laundry/profile/:id",
    {
      schema: get_laundry_for_owner,
      preHandler: controller.preHandler.bind(controller),
    },
    controller.getLaundryForOwner.bind(controller),
  );
};
