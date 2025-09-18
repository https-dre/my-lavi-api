import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { ownerController } from "../src/owner/routes";
import { logger } from "../src/logger";
import { customerController } from "../src/customer/routes";
import { laundryController } from "../src/laundry/routes";
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
      }),
    );

  // Configura as rotas
  app.get("/", ({ redirect }) => redirect("/docs"));
  app.use(ownerController);
  app.use(customerController);
  app.use(laundryController);
  return app;
};
