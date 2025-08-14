import { FastifyInstance } from "fastify";
import { create_laundry, get_laundry } from "../schemas/laundry-api";
import { LaundryService } from "../services/laundry-service";
import { LaundryRepository } from "../repositories/laundry-repository";
import { OwnerRepository } from "../repositories/owner-repository";
import { CryptoProvider } from "../providers/crypto-provider";
import { LaundryController } from "../controller/laundry-controller";

export const laundry_routes = (app: FastifyInstance) => {
  const laundryRepository = new LaundryRepository();
  const ownerRepository = new OwnerRepository();
  const laundryService = new LaundryService(
    laundryRepository,
    ownerRepository,
    new CryptoProvider()
  );
  const laundryController = new LaundryController(laundryService);

  app.post(
    "/laundry",
    { schema: create_laundry },
    laundryController.save.bind(laundryController)
  );

  app.get(
    "/laundry/:key",
    { schema: get_laundry },
    laundryController.getByIdOrCNPJ.bind(laundryController)
  );
};
