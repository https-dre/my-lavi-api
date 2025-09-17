import fastify, { FastifyInstance } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import { router } from "../src/shared/routes";
import { ServerErrorHandler } from "./error-handler";

/**
 * Build and config all application preferences
 *
 * Must be called after environment checking
 * @returns the main app instance
 */
export const buildApp = (): FastifyInstance => {
  const app = fastify();

  app.decorate("contextData", null);

  app.register(fastifyMultipart);
  app.register(fastifySwagger, {
    swagger: {
      consumes: ["application/json", "multipart/form-data"],
      produces: ["application/json"],
      info: {
        title: "Laví API Docs",
        description: "...",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  app.setErrorHandler(ServerErrorHandler);

  app.register(import("@scalar/fastify-api-reference"), {
    routePrefix: "/docs",
    configuration: {
      theme: "kepler",
    },
  });

  app.register(router);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  return app;
};
