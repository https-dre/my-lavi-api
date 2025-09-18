import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { ownerController } from "../src/owner/routes";
import { logger } from "../src/logger";
/**
 * @returns New Elysia App
 */
export const buildElysiaApp = (): Elysia => {
  const app = new Elysia()
    .onError(({ error, code }) => {
      console.log(`ERROR: code = ${code}`);
      console.log(error);
    })
    .use(
      openapi({
        path: "/docs",
        documentation: {
          info: {
            title: "Laví API",
            version: "2.0.0",
          },
        },
        // @ts-ignore
        scalar: {
          url: "/docs/json",
        },
      })
    );

  // Configura as rotas
  app.get("/", ({ redirect }) => redirect("/docs"));
  app.use(ownerController);
  return app;
};