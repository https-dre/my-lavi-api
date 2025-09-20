import { Elysia } from "elysia";
import { BadResponse } from "./error-handler";
import { openapi } from "@elysiajs/openapi";

import { memberController } from "@/member/routes";
import { customerController } from "../customer/routes";
import { laundryController } from "../laundry/routes";
import { orderController } from "@/order/routes";

/**
 * @returns New Elysia App
 */
export const buildElysiaApp = (): Elysia => {
  const app = new Elysia()
    .use(
      openapi({
        documentation: {
          info: {
            title: "Laví API - Docs",
            version: "v2.0.0",
          },
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
  app.get("/", ({ redirect }) => redirect("/openapi"));
  app.use(memberController);
  app.use(customerController);
  app.use(laundryController);
  app.use(orderController);

  // @ts-ignore
  return app;
};
