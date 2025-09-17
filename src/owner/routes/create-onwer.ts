import Elysia, { t } from "elysia";
import { ownerService } from ".";
import { ZodOwner } from "../../shared/dto/zod-schemas";
import z from "zod";

const OwnerT = t.Object({
  id: t.String(),
  name: t.String(),
  cpf: t.String(),
  created_at?: t.Date()
})

export const createOwner = new Elysia().post("/", async ({body, status}) => {
  const { owner } = body;
  const created = await ownerService.saveOwner(owner);
  return status(201, { owner_id: created.id, details: "Registrado." })
}, {
  tags: [ "owner" ],
  body: t.Object({ owner: OwnerT })
})
