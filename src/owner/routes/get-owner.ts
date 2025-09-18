import Elysia, { t } from "elysia";
import { OwnerType } from "../../shared/dto/typebox";
import { Type } from "@sinclair/typebox";
import { OwnerService } from "../owner-service";

export const getOwner = async (service: OwnerService): Promise<Elysia> => {
  return new Elysia().get(
    "/owners/:id",
    async ({ params, status }) => {
      const { id } = params;
      const ownerWithId = await service.findOwner(id);
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
};
