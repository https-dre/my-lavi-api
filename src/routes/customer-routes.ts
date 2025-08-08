import { FastifyInstance } from "fastify";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerController } from "../controller/customer-controller";
import { create_customer } from "./schemas/customer-api";

export const customer_routes = (app: FastifyInstance) => {
  const customerRepository = new CustomerRepository();
  const customerController = new CustomerController(customerRepository);

  app.post("/customers", { schema: create_customer}, customerController.save.bind(customerController));
}