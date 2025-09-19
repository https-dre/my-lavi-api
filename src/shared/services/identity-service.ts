import { IAccountRepository, ICustomerRepository } from "../repositories";

export class IdentityService {
  constructor(
    readonly customerRepository: ICustomerRepository,
    readonly accountRepository: IAccountRepository
  ) {}

  async isIdentityTaken(key: string) {
    const user = await this.accountRepository.findByCpf(key);
    const customer = await this.customerRepository.findByDoc(key);
    if ((user.role == "owner" && user) || customer) {
      return true;
    }

    return false;
  }
}
