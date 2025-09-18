import Elysia, { t } from "elysia";
import { OwnerService } from "../owner-service";

export const authenticateOwner = async (service: OwnerService): Promise<Elysia> => {
  return new Elysia().put(
    "/owners/login",
    async ({ body, status }) => {
      const { email, password } = body;
      const payload = await service.ownerLogin(email, password);
      return status(201, payload);
    },
    {
      detail: {
        summary: "Authenticate owner",
        tags: ["owner"],
      },
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
      response: {
        201: t.Object({
          owner_id: t.String({ format: "uuid" }),
          token: t.String(),
        }),
      },
    }
  );
};
