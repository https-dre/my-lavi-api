import Elysia from "elysia";
import { createEmployee } from "./create-employee";
import { appServices } from "../../shared/services";

const employeeController = new Elysia().use(
  createEmployee(appServices.employee)
);

export { employeeController };
