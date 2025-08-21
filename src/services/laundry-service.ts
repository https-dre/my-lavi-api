import { LaundryDTO } from "../dto";
import { BadResponse } from "../error-handler";
import { remove_sensitive_fields } from "../functions/remove-sensitive-fields";
import { LaundryModel } from "../models";
import { CryptoProvider } from "../providers/crypto-provider";
import { ILaundryRepository, IOwnerRepository } from "../repositories";

const sensitive_fields = [
  "account_number",
  "cnpj",
  "account_type",
  "bank_number",
  "bank_agency",
];

export class LaundryService {
  constructor(
    private repository: ILaundryRepository,
    private ownerRepository: IOwnerRepository,
    private crypto: CryptoProvider
  ) {}

  async save(laundry: Omit<LaundryDTO, "id" | "created_at">) {
    const cnpj_index = this.crypto.sha256(laundry.cnpj!);
    const laundryFounded = await this.repository.findByCNPJ(cnpj_index);
    if (laundryFounded) {
      throw new BadResponse("Este CNPJ já foi registrado.");
    }

    const owner = this.ownerRepository.findById(laundry.ownerId!);
    if (!owner) {
      throw new BadResponse("Cadastro de dono não encontrado!");
    }

    const encrypted_laundry: Omit<LaundryModel, "id"> = {
      ...laundry,
      cnpj_blind_index: cnpj_index,
      cnpj: this.crypto.encrypt(laundry.cnpj!),
      bank_code: this.crypto.encrypt(laundry.bank_code!),
      bank_agency: this.crypto.encrypt(laundry.bank_agency!),
      account_number: this.crypto.encrypt(laundry.account_number!),
      account_type: this.crypto.encrypt(laundry.account_type!),
    };

    const saved_laundry = await this.repository.save(encrypted_laundry);
    return saved_laundry.id;
  }

  async find(key: string) {
    let laundryFounded = await this.repository.findById(key);

    if (!laundryFounded)
      laundryFounded = await this.repository.findByCNPJ(
        this.crypto.sha256(key)
      );

    if (!laundryFounded)
      throw new BadResponse("Lavanderia não encontrada.", 404);

    const decrypted_laundry = this.crypto.decryptEntity(
      laundryFounded,
      sensitive_fields
    );
    return remove_sensitive_fields(decrypted_laundry);
  }
}
