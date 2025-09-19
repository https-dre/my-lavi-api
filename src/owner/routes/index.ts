import Elysia from "elysia";
import { postOwner } from "./post-owner";
import { getOwner } from "./get-owner";
import { deleteOwner } from "./delete-owner";
import { listOwners } from "./list-owners";
import { authenticateOwner } from "./authenticate-owner";
import { appServices } from "../../shared/services";

// CONFIGURA AS ROTAS PARA 'OWNER'
const ownerController = new Elysia()
  .use(postOwner(appServices.owner))
  .use(getOwner(appServices.owner))
  .use(deleteOwner(appServices.owner))
  .use(listOwners(appServices.owner))
  .use(authenticateOwner(appServices.owner));

export { ownerController };
