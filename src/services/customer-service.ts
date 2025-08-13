import { CustomerDTO } from "../dto";
import { BadRequest } from "../error-handler";
import { CryptoProvider, JwtProvider } from "../providers/crypto-provider";
import { ICustomerRepository } from "../repositories";

export class CustomerService {
  constructor(
    readonly repository: ICustomerRepository,
    readonly crypto: CryptoProvider,
    readonly jwt: JwtProvider
  ) {}

  public async createCustomer(
    customer: Omit<CustomerDTO, "id" | "created_at">
  ) {
    const email_hash = this.crypto.sha256(customer.email);
    if (await this.repository.findByEmail(email_hash)) {
      throw new BadRequest("E-mail já cadastrado!");
    }

    const doc_hash = this.crypto.sha256(customer.doc);
    if (await this.repository.findByDoc(doc_hash)) {
      throw new BadRequest("CPF já cadastrado!");
    }

    if (customer.is_pj && customer.doc.length !== 14) {
      throw new BadRequest("CNPJ deve conter exatamente 14 caracteres.");
    }

    const encrypted_customer = {
      ...customer,
      email_hash,
      email: this.crypto.encrypt(customer.email),
      doc_hash,
      doc: this.crypto.encrypt(customer.doc),
      name: this.crypto.encrypt(customer.name!),
      password: this.crypto.hashPassword(customer.password!),
    };

    const created = await this.repository.save(encrypted_customer);
    return created.id;
  }

  public async authCustomer(email: string, password: string) {
    const customerFounded = await this.repository.findByEmail(
      this.crypto.sha256(email)
    );
    if (
      !customerFounded ||
      !this.crypto.comparePassword(password, customerFounded.password!)
    ) {
      throw new BadRequest("Senha ou e-mail incorretos!", 401);
    }

    return this.jwt.generateToken({ email });
  }

  public async updateCustomer(id: string, fields: Record<string, any>) {
    const customerFounded = await this.repository.findById(id);
    if(!customerFounded) {
      throw new BadRequest("Cliente não encontrado.", 404)
    }

    const update: Record<string, any> = {};
    for (const key of Object.keys(fields)) {
      if(["email", "doc"].includes(key)) {
        update[`${key}_sha256`] = this.crypto.sha256(fields[key]);
        update[key] = this.crypto.encrypt(fields[key]);
        continue;
      }

      update[key] = fields[key];
    }

    await this.repository.update(update, id);
    return id;
  }
}
