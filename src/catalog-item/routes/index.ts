import Elysia from "elysia";
import { createCatalogItem } from "./create-catalog-item";
import { appServices } from "@/shared/services";

const catalogController = new Elysia().use(
  createCatalogItem(appServices.catalogService),
);

export { catalogController };
