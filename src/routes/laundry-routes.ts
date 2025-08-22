import { FastifyInstance } from "fastify";
import {
  create_laundry,
  get_laundry,
  get_laundry_for_owner,
} from "../schemas/laundry-api";
import { LaundryService } from "../services/laundry-service";
import { LaundryRepository } from "../repositories/laundry-repository";
import { OwnerRepository } from "../repositories/owner-repository";
import { CryptoProvider } from "../providers/crypto-provider";
import { LaundryController } from "../controller/laundry-controller";

export const laundry_routes = (app: FastifyInstance) => {
  const laundryRepository = new LaundryRepository();
  const ownerRepository = new OwnerRepository();
  const laundryService = new LaundryService(laundryRepository, ownerRepository);
  const controller = new LaundryController(laundryService);

  app.post(
    "/laundry",
    { schema: create_laundry },
    controller.save.bind(controller)
  );

  app.get(
    "/laundry/:key",
    { schema: get_laundry },
    controller.getByIdOrCNPJ.bind(controller)
  );

  app.get(
    "/laundry/profile/:id",
    {
      schema: get_laundry_for_owner,
      preHandler: controller.preHandler.bind(controller),
    },
    controller.getLaundryForOwner.bind(controller)
  );
};
