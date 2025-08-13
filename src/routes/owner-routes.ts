import { FastifyInstance } from "fastify";
import { OwnerRepository } from "../repositories/owner-repository";
import { OwnerController } from "../controller/owner-controller";
import { auth_owner, create_owner } from "../schemas/owner-api";
import { OwnerService } from "../services/owner-service";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";

export const owner_routes = (app: FastifyInstance) => {
  const ownerService = new OwnerService(
    new OwnerRepository(),
    new CryptoProvider(),
    new JwtProvider()
  )
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
  )
};
