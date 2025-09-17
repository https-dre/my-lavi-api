import Elysia, { t } from "elysia";
import { ownerService } from ".";
import { OwnerType } from "../../shared/dto/typebox";
import { Type } from "@sinclair/typebox";

export const createOwner = new Elysia().post(
  "/owner",
  async ({ body, status }) => {
    const { owner } = body;
    const created = await ownerService.saveOwner(owner);
    return status(201, { owner_id: created.id, details: "Registrado." });
  },
  {
    detail: {
      summary: "Create owner",
      tags: ["owner"],
    },
    body: t.Object({
      owner: Type.Omit(OwnerType, ["id", "created_at"]),
    }),
  }
);
