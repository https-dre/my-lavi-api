import { BadResponse } from "../http/error-handler";
import { MemberModel } from "../shared/models";
import {
  CryptoProvider,
  JwtProvider,
} from "../shared/providers/crypto-provider";
import { IMemberRepository } from "@/shared/repositories";
import { MemberDTO } from "../shared/dto";
import { MemberType } from "../shared/dto/typebox";
import _ from "lodash";

export class MemberService {
  constructor(
    readonly repository: IMemberRepository,
    readonly jwt: JwtProvider,
    readonly crypto: CryptoProvider,
  ) {}

  private adaptModel(model: MemberModel): MemberDTO {
    const dtoKeys = Object.keys(MemberType.properties) as (keyof MemberDTO)[];
    return _.pick(model, dtoKeys);
  }

  private decryptAccount(model: MemberModel): MemberDTO {
    const decrypted = this.crypto.decryptEntity(model, [
      "name",
      "email",
      "cpf",
    ]);
    return this.adaptModel(decrypted);
  }

  async createAccount(account: Omit<MemberDTO, "id" | "created_at">) {
    const email_blind_index = this.crypto.hmac(account.email);
    if (await this.repository.findByEmail(email_blind_index))
      throw new BadResponse("E-mail já cadastrado!");

    const cpf_blind_index = this.crypto.hmac(account.cpf);
    if (await this.repository.findByCpf(cpf_blind_index))
      throw new BadResponse("CPF já cadastrado!");

    const encrypted: Omit<MemberModel, "id" | "created_at"> = {
      ...account,
      cpf_blind_index,
      email_blind_index,
      email: this.crypto.encrypt(account.email),
      cpf: this.crypto.encrypt(account.cpf),
      name: this.crypto.encrypt(account.name),
      password: this.crypto.hashPassword(account.password),
    };
    const created = await this.repository.save(encrypted);
    return this.decryptAccount(created);
  }

  async deleteAccount(id: string) {
    if (!(await this.repository.findById(id)))
      throw new BadResponse("Conta não encontrada", 404);

    await this.repository.deleteById(id);
  }

  async getAccountById(id: string): Promise<MemberDTO> {
    const account = await this.repository.findById(id);
    if (!account) throw new BadResponse("Conta não encontrada", 404);

    return this.decryptAccount(account);
  }

  async authenticateAccount(
    email: string,
    password: string,
  ): Promise<{ accountId: string | null; auth: boolean }> {
    const account = await this.repository.findByEmail(this.crypto.hmac(email));
    if (!account) return { accountId: null, auth: false };

    const passResult = this.crypto.comparePassword(password, account.password);
    if (!passResult) return { accountId: null, auth: false };

    return { accountId: account.id, auth: true };
  }
}
