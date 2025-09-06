import JWT from "jsonwebtoken";
import { CustomerDTO } from "../shared/dto";
import { BadResponse } from "../infra/error-handler";
import {
  CryptoProvider,
  JwtProvider,
} from "../shared/providers/crypto-provider";
import { ICustomerRepository } from "../shared/repositories";
import { IdentityService } from "../shared/services/identity-service";

export class CustomerService {
  constructor(
    readonly repository: ICustomerRepository,
    readonly crypto: CryptoProvider,
    readonly jwt: JwtProvider,
    readonly identityService: IdentityService,
  ) {}

  public async createCustomer(
    customer: Omit<CustomerDTO, "id" | "created_at">,
  ) {
    const email_index = this.crypto.hmac(customer.email);
    if (await this.repository.findByEmail(email_index)) {
      throw new BadResponse("E-mail já cadastrado!");
    }

    if (customer.is_pj && customer.doc.length !== 14) {
      throw new BadResponse("CNPJ deve conter exatamente 14 caracteres.");
    }

    const doc_index = this.crypto.hmac(customer.doc);
    if (await this.identityService.isIdentityTaken(doc_index)) {
      throw new BadResponse("Identidade já existe.");
    }

    const encrypted_customer = {
      ...customer,
      email_blind_index: email_index,
      email: this.crypto.encrypt(customer.email),
      doc_blind_index: doc_index,
      doc: this.crypto.encrypt(customer.doc),
      name: this.crypto.encrypt(customer.name!),
      password: this.crypto.hashPassword(customer.password!),
    };

    const created = await this.repository.save(encrypted_customer);
    return created.id;
  }

  /**
   *
   * @param email Normal e-mail
   * @param password Normal password
   * @returns Jwt token with normal e-mail
   */
  public async authCustomer(email: string, password: string): Promise<string> {
    const customerFounded = await this.repository.findByEmail(
      this.crypto.hmac(email),
    );
    if (
      !customerFounded ||
      !this.crypto.comparePassword(password, customerFounded.password!)
    ) {
      throw new BadResponse("Senha ou e-mail incorretos!", 401);
    }

    return this.jwt.generateToken({ email });
  }

  public async updateCustomer(id: string, fields: Record<string, any>) {
    const customerFounded = await this.repository.findById(id);
    if (!customerFounded) {
      throw new BadResponse("Cliente não encontrado.", 404);
    }

    const update: Record<string, any> = {};
    for (const key of Object.keys(fields)) {
      if (["email", "doc"].includes(key)) {
        update[`${key}_blind_index`] = this.crypto.hmac(fields[key]);
        update[key] = this.crypto.encrypt(fields[key]);
        continue;
      }

      update[key] = fields[key];
    }

    await this.repository.update(update, id);
    return id;
  }

  /**
   * Check the token JWT
   * @param token The JWT Token
   * @returns The JWT payload with normal E-mail
   */
  public async checkAuth(token: string) {
    try {
      const payload = this.jwt.verifyToken(token) as { email: string };
      const email_hash = this.crypto.hmac(payload.email);
      if (!(await this.repository.findByEmail(email_hash)))
        throw new BadResponse("E-mail não encontrado!", 404);
      return payload;
    } catch (err) {
      if (err instanceof JWT.TokenExpiredError)
        throw new BadResponse("Sessão expirou.");
      if (err instanceof JWT.JsonWebTokenError)
        throw new BadResponse("Sessão inválida.", 401);

      throw err;
    }
  }

  public async listAllIds(): Promise<{ id: string }[]> {
    const result = await this.repository.listAllIds();
    return result;
  }
}
