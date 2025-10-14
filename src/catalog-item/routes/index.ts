import Elysia from "elysia";
import { createCatalogItem } from "./create-catalog-item";
import { deleteCatalogItem } from "./delete-catalog-item";

import { appServices } from "@/shared/services";
import { getCatalogByLaundry } from "./get-catalog-by-laundry";

const catalogController = new Elysia()
  .use(createCatalogItem(appServices.catalogService))
  .use(deleteCatalogItem(appServices.catalogService))
  .use(getCatalogByLaundry(appServices.catalogService));

export { catalogController };
