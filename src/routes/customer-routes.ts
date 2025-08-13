import { FastifyInstance } from "fastify";
import { CustomerRepository } from "../repositories/customer-repository";
import { CustomerController } from "../controller/customer-controller";
import {
  auth_customer,
  create_customer,
  update_customer,
} from "../schemas/customer-api";
import { CustomerService } from "../services/customer-service";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";

export const customer_routes = (app: FastifyInstance) => {
  const customerService = new CustomerService(
    new CustomerRepository(),
    new CryptoProvider(),
    new JwtProvider()
  );
  const customerController = new CustomerController(customerService);

  app.post(
    "/customer",
    { schema: create_customer },
    customerController.save.bind(customerController)
  );

  app.put(
    "/customer/sign",
    { schema: auth_customer },
    customerController.auth.bind(customerController)
  );

  app.put(
    "/customer/update",
    { schema: update_customer },
    customerController.update.bind(customerController)
  );
};
