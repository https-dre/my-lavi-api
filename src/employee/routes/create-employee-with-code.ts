import Elysia, { t } from "elysia";
import { EmployeeService } from "../employee.service";
import { EmployeeType } from "../../shared/dto/typebox";

export const createEmployeeWithCode = (service: EmployeeService): Elysia => {
  return new Elysia().post(
    "/laundry/employees/:code",
    async ({ params, body, status }) => {
      const { code } = params;
      const { employee } = body;
      const created = await service.createEmployeeByCode(code, employee);
      return status(201, { employee_id: created.id });
    },
    {
      detail: {
        summary: "Create employee with code",
        tags: ["employees"],
      },
      body: t.Object({
        employee: t.Omit(EmployeeType, ["id", "laundryId"]),
      }),
      response: {
        201: t.Object({
          employee_id: t.String({ format: "uuid" }),
        }),
      },
    }
  );
};
