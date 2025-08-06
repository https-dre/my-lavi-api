import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";


export const router = async (server: FastifyInstance) => {
  const app = server.withTypeProvider<ZodTypeProvider>();

  app.get("/", {}, (req, reply) => {
    reply.redirect('/docs');
  })
}