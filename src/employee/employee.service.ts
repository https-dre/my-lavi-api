import _ from "lodash";
import { EmployeeDTO } from "../shared/dto";
import { EmployeeType } from "../shared/dto/typebox";
import { EmployeeModel } from "../shared/models";
import { CryptoProvider } from "../shared/providers/crypto-provider";
import {
  IEmployeeRepository,
  ILaundryRepository,
} from "../shared/repositories";
import { BadResponse } from "../../http/error-handler";

export class EmployeeService {
  constructor(
    private repository: IEmployeeRepository,
    private laundryRepository: ILaundryRepository,
    private crypto: CryptoProvider
  ) {}

  async saveEmployee(data: Omit<EmployeeDTO, "id">): Promise<EmployeeDTO> {
    const email_blind_index = this.crypto.hmac(data.email);
    
    const employeeWithEmail = await this.repository.findByEmail(
      email_blind_index
    );
    if (employeeWithEmail) throw new BadResponse("E-mail já cadastrado!");

    const laundryWithId = await this.laundryRepository.findById(data.laundryId);
    if (!laundryWithId) throw new BadResponse("Lavanderia não encontrada.");

    const encrypted: Omit<EmployeeModel, "id"> = {
      ...data,
      email: this.crypto.encrypt(data.email),
      email_blind_index,
      cpf: this.crypto.encrypt(data.cpf),
      cpf_blind_index: this.crypto.hmac(data.cpf),
      name: this.crypto.encrypt(data.name),
    };
    const saved = await this.repository.save(encrypted);
    return this.decryptEmployee(saved);
  }

  decryptEmployee(data: EmployeeModel): EmployeeDTO {
    const decrypted = this.crypto.decryptEntity(data, ["name", "email", "cpf"]);
    return this.adaptModel(decrypted);
  }

  adaptModel(model: EmployeeModel): EmployeeDTO {
    const dtoKeys = Object.keys(
      EmployeeType.properties
    ) as (keyof EmployeeDTO)[];
    return _.pick(model, dtoKeys);
  }
}
