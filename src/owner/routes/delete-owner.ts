import Elysia, { t } from "elysia";
import { OwnerService } from "../owner-service";

export const deleteOwner = async (service: OwnerService): Promise<Elysia> => {
  return new Elysia().delete(
    "/owners/:id",
    async ({ params, status }) => {
      const { id } = params;
      await service.deleteById(id);
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
};
