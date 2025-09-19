import Elysia from "elysia";
import { createLaundry } from "./create-laundry";
import { deleteLaundry } from "./delete-laundry";
import { getLaundry } from "./get-laundry";
import { searchLaundriesByName } from "./search-by-name";
import { appServices } from "../../shared/services";

const laundryController = new Elysia()
  .use(createLaundry(appServices.laundry))
  .use(deleteLaundry(appServices.laundry))
  .use(getLaundry(appServices.laundry))
  .use(searchLaundriesByName(appServices.laundry));

export { laundryController };
