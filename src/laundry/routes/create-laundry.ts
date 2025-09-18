import Elysia, { t } from "elysia";
import { LaundryService } from "../laundry-service";
import { LaundryType } from "../../shared/dto/typebox";

export const createLaundry = (service: LaundryService): Elysia => {
  return new Elysia().post(
    "/laundries",
    async ({ body, status }) => {
      const { laundry } = body;
      const laundryId = await service.save(laundry);
      return status(201, { laundryId });
    },
    {
      detail: {
        summary: "Create laundry",
        tags: ["laundries"],
      },
      body: t.Object({
        laundry: t.Omit(LaundryType, ["created_at", "id"]),
      }),
      response: {
        201: t.Object({
          laundryId: t.String({ format: "uuid" }),
        }),
      },
    },
  );
};
