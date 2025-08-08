import { FastifyInstance } from "fastify";
import { OwnerRepository } from "../repositories/owner-repository";
import { OwnerController } from "../controller/owner-controller";
import { create_owner } from "./schemas/owner-api";

export const owner_routes = (app: FastifyInstance) => {
  const ownerRepository = new OwnerRepository();
  const ownerController = new OwnerController(ownerRepository);

  app.post("/owners", { schema: create_owner}, ownerController.save.bind(ownerController));
};
