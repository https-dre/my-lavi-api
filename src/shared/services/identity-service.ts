import { IMemberRepository, ICustomerRepository } from "../repositories";

export class IdentityService {
  constructor(
    readonly customerRepository: ICustomerRepository,
    readonly memberRepository: IMemberRepository
  ) {}

  async isIdentityTaken(key: string) {
    const user = await this.memberRepository.findByCpf(key);
    const customer = await this.customerRepository.findByDoc(key);
    if ((user.roles.includes("owner") && user) || customer) {
      return true;
    }

    return false;
  }
}
