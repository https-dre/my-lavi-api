import Elysia, { t } from "elysia";
import { ownerService } from ".";

export const deleteOwner = new Elysia().delete(
  "/owners/:id",
  async ({ params, status }) => {
    const { id } = params;
    await ownerService.deleteById(id);
    return status(200);
  },
  {
    detail: {
      summary: "Delete owner with Id",
      tags: ["owner"],
    },
    headers: t.Object({ authorization: t.String() }),
    params: t.Object({
      id: t.String({ format: "uuid" }),
    }),
  }
);
