import { ICustomerRepository, IOwnerRepository } from "../repositories";

export class IdentityService {
  constructor(
    readonly customerRepository: ICustomerRepository,
    readonly ownerRepository: IOwnerRepository
  ) {}

  async isIdentityTaken(key: string) {
    const owner = await this.ownerRepository.findByCpf(key);
    const customer = await this.customerRepository.findByDoc(key);
    if (owner || customer) {
      return true
    }

    return false
  }
}
