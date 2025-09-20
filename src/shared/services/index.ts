import { CustomerRepository } from "@/customer/customer-repository";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";
import { IdentityService } from "./identity-service";
import { OrderRepository } from "@/order/order-repository";
import { OrderService } from "@/order/order-service";
import { LaundryRepository } from "@/laundry/laundry-repository";
import { LaundryService } from "@/laundry/laundry-service";
import { CustomerService } from "@/customer/customer-service";
import { MemberRepository } from "@/member/member-repository";
import { MemberService } from "@/member/member-service";

const customerRepository = new CustomerRepository();
const orderRepository = new OrderRepository();
const laundryRepository = new LaundryRepository();
const memberRepository = new MemberRepository();

const cryptoProvider = new CryptoProvider();
const jwtProvider = new JwtProvider();

const identityService = new IdentityService(
  customerRepository,
  memberRepository,
);

const appServices = {
  identity: new IdentityService(customerRepository, memberRepository),
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
  ),
  laundry: new LaundryService(laundryRepository, memberRepository),
  member: new MemberService(
    memberRepository,
    laundryRepository,
    jwtProvider,
    cryptoProvider,
  ),
};

export { appServices };
