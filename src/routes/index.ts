import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { owner_routes } from "./owner-routes";
import { customer_routes } from "./customer-routes";

export const router = async (server: FastifyInstance) => {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get("/", {}, (_, reply) => {
    reply.redirect("/docs");
  });

  app.get("/ping", {}, (_, reply) => {
    reply.code(200).send({ pong: true })
  })

  owner_routes(app);
  customer_routes(app);
};

