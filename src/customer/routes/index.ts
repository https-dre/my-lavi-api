import Elysia from "elysia";
import { postCustomer } from "./post-customer";
import { deleteCustomer } from "./delete-customer";
import { getCustomer } from "./get-customer";
import { updateCustomer } from "./update-customer";
import { authenticateCustomer } from "./authenticate-customer";
import { listCustomers } from "./list-customers";
import { appServices } from "../../shared/services";
import { getCustomerOrders } from "./get-customer-orders";

const customerController = new Elysia()
  .use(postCustomer(appServices.customer))
  .use(deleteCustomer(appServices.customer))
  .use(getCustomer(appServices.customer))
  .use(updateCustomer(appServices.customer))
  .use(authenticateCustomer(appServices.customer))
  .use(listCustomers(appServices.customer))
  .use(getCustomerOrders(appServices.customer, appServices.order));

export { customerController };
