import { Elysia } from "elysia";
import { BadResponse } from "./error-handler";
import { openapi } from "@elysiajs/openapi";
import { ownerController } from "../src/owner/routes";
import { customerController } from "../src/customer/routes";
import { laundryController } from "../src/laundry/routes";
import { orderController } from "../src/order/routes";

/**
 * @returns New Elysia App
 */
export const buildElysiaApp = (): Elysia => {
  const app = new Elysia()
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
    )
    .error({
      BadResponse,
    })
    .onError(({ code, error, status }) => {
      switch (code) {
        case "BadResponse":
          return status(error.status, error.response);
        default:
          return status(500, {
            details: "Internal server error",
            alert: "CONTACT ADM!",
            error,
          });
      }
    });

  // Configura as rotas
  app.get("/", ({ redirect }) => redirect("/docs"));
  app.use(ownerController);
  app.use(customerController);
  app.use(laundryController);
  app.use(orderController);
  // @ts-ignore
  return app;
};
