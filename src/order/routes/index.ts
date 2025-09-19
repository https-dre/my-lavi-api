import Elysia from "elysia";
import { createOrder } from "./create-order";
import { deleteOrder } from "./delete-order";
import { appServices } from "../../shared/services";

const orderController = new Elysia()
  .use(createOrder(appServices.order))
  .use(deleteOrder(appServices.order));

export { orderController };
