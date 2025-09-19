import { CustomerRepository } from "../../customer/customer-repository";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";
import { IdentityService } from "./identity-service";
import { OrderRepository } from "../../order/order-repository";
import { OrderService } from "../../order/order-service";
import { LaundryRepository } from "../../laundry/laundry-repository";
import { LaundryService } from "../../laundry/laundry-service";
import { CustomerService } from "../../customer/customer-service";

const customerRepository = new CustomerRepository();
const orderRepository = new OrderRepository();
const laundryRepository = new LaundryRepository();

const cryptoProvider = new CryptoProvider();
const jwtProvider = new JwtProvider();

const appServices = {
  identity: new IdentityService(customerRepository, ownerRepository),
  customer: new CustomerService(
    customerRepository,
    cryptoProvider,
    jwtProvider,
    identityService,
  ),
  order: new OrderService(
    orderRepository,
    customerRepository,
    laundryRepository,
  )
};

export { appServices };
