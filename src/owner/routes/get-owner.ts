import Elysia, { t } from "elysia";
import { ownerService } from ".";
import { OwnerType } from "../../shared/dto/typebox";
import { Type } from "@sinclair/typebox";

export const findOwner = new Elysia().get(
  "/owners/:id",
  async ({ params, status }) => {
    const { id } = params;
    const ownerWithId = await ownerService.findOwner(id);
    return status(200, {
      owner: ownerWithId,
    });
  },
  {
    detail: {
      summary: "Get owner with Id",
      tags: ["owner"],
    },
    params: t.Object({ id: t.String() }),
    response: {
      200: t.Object({ owner: Type.Omit(OwnerType, ["password"]) }),
    },
  }
);
