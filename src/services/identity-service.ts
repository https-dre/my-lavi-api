import { ICustomerRepository, IOwnerRepository } from "../repositories";

export class IdentityService {
  constructor(
    readonly customerRepository: ICustomerRepository,
    readonly ownerRepository: IOwnerRepository
  ) {}

  async isIdentityTaken(key: string) {
    const ownerFounded = await this.ownerRepository.findByCpf(key);
    const customerFounded = await this.customerRepository.findByDoc(key);
    if (ownerFounded || customerFounded) {
      return true
    }

    return false
  }
}
