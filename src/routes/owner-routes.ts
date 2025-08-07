import { FastifyInstance } from "fastify";
import { OwnerRepository } from "../repositories/owner-repository";
import { OwnerController } from "../controller/owner-controller";

export const owner_routes = (app: FastifyInstance) => {
  const ownerRepository = new OwnerRepository();
  const ownerController = new OwnerController(ownerRepository);

  app.post("/owners", {}, ownerController.save.bind(ownerController));
};
