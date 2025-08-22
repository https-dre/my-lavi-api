import { OwnerDTO } from "../dto";
import { BadResponse } from "../error-handler";
import { remove_sensitive_fields } from "../functions/remove-sensitive-fields";
import { logger } from "../logger";
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

  async saveOwner(
    owner: Omit<OwnerDTO, "id" | "created_at">
  ): Promise<OwnerModel> {
    if (owner.cpf.includes(".") || owner.cep.includes("-")) {
      throw new BadResponse("CEP e CPF devem conter somente números.");
    }

    const cpf_index = this.crypto.hmac(owner.cpf);
    if (await this.identityService.isIdentityTaken(cpf_index)) {
      throw new BadResponse("CPF já exite.");
    }

    const email_index = this.crypto.hmac(owner.email);
    if (await this.repository.findByEmail(email_index)) {
      throw new BadResponse("E-mail já exite.");
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
    };
    const owner_saved = await this.repository.save(encrypted_owner);
    return owner_saved;
  }

  async ownerLogin(email: string, password: string) {
    const emailIndex = this.crypto.hmac(email);
    const ownerWithEmail = await this.repository.findByEmail(emailIndex);
    if (!ownerWithEmail) throw new BadResponse("Cadastro não encontrado.", 404);

    const passResult = this.crypto.comparePassword(
      password,
      ownerWithEmail.password
    );
    if (!passResult) {
      throw new BadResponse("Login ou senha incorretos.");
    }

    const token = this.jwt.generateToken({ email });
    return { token, owner_id: ownerWithEmail.id };
  }

  async checkJwt(token: string) {
    const payload = this.jwt.verifyToken(token) as { email: string };
    const owner = await this.repository.findByEmail(payload.email);
    if (!owner) throw new BadResponse("Cadastro não encontrado.", 404);
    return payload;
  }

  async findOwner(id: string) {
    const owner = await this.repository.findById(id);
    if (!owner) throw new BadResponse("Cadastro não encontrado.", 404);
    const decryptedOwner = this.crypto.decryptEntity(owner, [
      "cep",
      "email",
      "cpf",
    ]);
    return remove_sensitive_fields(decryptedOwner);
  }

  async deleteById(id: string) {
    const onwerWithId = await this.repository.findById(id);
    if (!onwerWithId) throw new BadResponse("Nenhum cadastro encontrado", 404);
    await this.repository.delete(id);
  }
}
