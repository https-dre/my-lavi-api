import Elysia, { t } from "elysia";
import { EmployeeService } from "../employee.service";
import { EmployeeType } from "../../shared/dto/typebox";

export const createEmployee = (service: EmployeeService): Elysia => {
  return new Elysia().post(
    "/employees",
    async ({ body, status }) => {
      const { employee } = body;
      const created = await service.saveEmployee(employee);
      return status(201, { employee_id: created.id });
    },
    {
      detail: {
        summary: "Create employee",
        tags: ["employees"],
      },
      body: t.Object({
        employee: t.Omit(EmployeeType, ["id"]),
      }),
      response: {
        201: t.Object({
          employee_id: t.String({ format: "uuid" }),
        }),
      },
    }
  );
};
