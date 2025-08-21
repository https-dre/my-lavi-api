import { OwnerDTO } from "../dto";
import { BadResponse } from "../error-handler";
import { OwnerModel } from "../models";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";
import { IOwnerRepository } from "../repositories";
import { IdentityService } from "./identity-service";

export class OwnerService {
  constructor(
    private repository: IOwnerRepository,
    private crypto: CryptoProvider,
    private jwt: JwtProvider,
    private identityService: IdentityService
  ) {}

  async saveOwner(owner: Omit< OwnerDTO, "id" | "created_at">): Promise<OwnerModel> {
    if (owner.cpf.includes(".") || owner.cep.includes("-")) {
      throw new BadResponse("CEP e CPF devem conter somente números.")
    }

    const cpf_index = this.crypto.sha256(owner.cpf);
    if(await this.identityService.isIdentityTaken(cpf_index)) {
      throw new BadResponse("CPF já exite.")
    }

    const email_index = this.crypto.sha256(owner.cep);
    if(await this.repository.findByEmail(email_index)) {
      throw new BadResponse("E-mail já exite.")
    }

    const password_hash = this.crypto.hashPassword(owner.password);
    const encrypted_owner: Omit<OwnerModel, "id"> = {
      ...owner,
      email_blind_index: email_index,
      email: this.crypto.encrypt(owner.email),
      cpf_blind_index: cpf_index,
      cpf: this.crypto.encrypt(owner.cpf),
      cep: this.crypto.encrypt(owner.cep),
      verified: false,
      name: this.crypto.encrypt(owner.name),
      password: password_hash,
    }

    const owner_saved = await this.repository.save(encrypted_owner);
    return owner_saved
  }

  async authenticateOwner(email: string, password: string) {
    const ownerFounded = await this.repository
      .findByEmail(this.crypto.sha256(email));
    if(!ownerFounded) {
      throw new BadResponse("Cadastro não encontrado.", 404);
    }

    const passResult = this.crypto.comparePassword(password, ownerFounded.password);
    if(!passResult) {
      throw new BadResponse("Login ou senha incorretos.");
    }

    const token = this.jwt.generateToken({ email });
    return token;
  }
}