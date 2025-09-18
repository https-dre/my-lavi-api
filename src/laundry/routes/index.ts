import Elysia from "elysia";
import { OwnerRepository } from "../../owner/owner-repository";
import { LaundryRepository } from "../laundry-repository";
import { LaundryService } from "../laundry-service";
import { createLaundry } from "./create-laundry";
import { deleteLaundry } from "./delete-laundry";
import { getLaundry } from "./get-laundry";
import { searchLaundriesByName } from "./search-by-name";

const laundryService = new LaundryService(
  new LaundryRepository(),
  new OwnerRepository(),
);

const laundryController = new Elysia()
  .use(createLaundry(laundryService))
  .use(deleteLaundry(laundryService))
  .use(getLaundry(laundryService))
  .use(searchLaundriesByName(laundryService));

export { laundryController };
