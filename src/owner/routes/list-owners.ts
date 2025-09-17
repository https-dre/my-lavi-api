import Elysia from "elysia";
import { ownerService } from ".";
import { Type } from "@sinclair/typebox";

export const listOwners = new Elysia().get(
  "/public/owners",
  async ({ status }) => {
    const owners = await ownerService.listAllIds();
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
