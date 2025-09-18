import Elysia, { t } from "elysia";
import { OwnerType } from "../../shared/dto/typebox";
import { Type } from "@sinclair/typebox";
import { OwnerService } from "../owner-service";

export const postOwner = async (service: OwnerService): Promise<Elysia> => {
  return new Elysia().post(
    "/owner",
    async ({ body, status }) => {
      const { owner } = body;
      const created = await service.saveOwner(owner);
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
};
