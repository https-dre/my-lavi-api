import Elysia from "elysia";
import { authenticateMember } from "./authenticate-account";
import { appServices } from "@/shared/services";
import { createMember } from "./create-member";
import { createOwnerMember } from "./create-owner";
import { createEmployeeMember } from "./create-employee";
import { listMembers } from "./list-members";

const memberController = new Elysia()
  .use(authenticateMember(appServices.member))
  .use(createMember(appServices.member))
  .use(createOwnerMember(appServices.member))
  .use(createEmployeeMember(appServices.member))
  .use(listMembers(appServices.member));

export { memberController };
