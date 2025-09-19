import Elysia from "elysia";
import { createEmployee } from "./create-employee";
import { appServices } from "../../shared/services";
import { createEmployeeWithCode } from "./create-employee-with-code";

const employeeController = new Elysia()
  .use(createEmployee(appServices.employee))
  .use(createEmployeeWithCode(appServices.employee));
export { employeeController };
