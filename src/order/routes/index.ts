import Elysia from "elysia";
import { createOrder } from "./create-order";
import { deleteOrder } from "./delete-order";
import { appServices } from "../../shared/services";
import { pushOrderItems } from "./push-order-items";

const orderController = new Elysia()
  .use(createOrder(appServices.order))
  .use(deleteOrder(appServices.order))
  .use(pushOrderItems(appServices.order));

export { orderController };
