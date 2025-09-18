import Elysia from "elysia";
import { Type } from "@sinclair/typebox";
import { OwnerService } from "../owner-service";

export const listOwners = async (service: OwnerService): Promise<Elysia> => {
  return new Elysia().get(
    "/public/owners",
    async ({ status }) => {
      const owners = await service.listAllIds();
      const ids = owners.map((e) => e.id);
      return status(200, { ids });
    },
    {
      detail: {
        summary: "List owners id",
        tags: ["owner"],
      },
      response: {
        200: Type.Object({ ids: Type.Array(Type.String({ format: "uuid" })) }),
      },
    }
  );
};
