import { BadResponse } from "@/http/error-handler";
import { CatalogItemDTO } from "@/shared/dto";
import {
  ICatalogItemRepository,
  ILaundryRepository,
} from "@/shared/repositories";

export class CatalogItemService {
  constructor(
    private repository: ICatalogItemRepository,
    private laundryRepository: ILaundryRepository,
  ) {}

  async createItem(data: Omit<CatalogItemDTO, "id">): Promise<CatalogItemDTO> {
    if (!(await this.laundryRepository.findById(data.laundryId)))
      throw new BadResponse("Lavanderia não encontrada!", 404);

    const created = await this.repository.create(data);
    return created;
  }

  async deleteItem(id: string): Promise<void> {
    if (!(await this.repository.findById(id)))
      throw new BadResponse("Item não encontrado!", 404);

    await this.repository.deleteById(id);
  }

  async findByLaundryId(laundryId: string): Promise<CatalogItemDTO[]> {
    if (!(await this.laundryRepository.findById(laundryId)))
      throw new BadResponse("Lavanderia não encontrada", 404);

    const items = await this.repository.findByLaundryId(laundryId);
    return items;
  }

  async findById(id: string): Promise<CatalogItemDTO> {
    const item = await this.repository.findById(id);
    if (!item) throw new BadResponse("Item não encontrado!", 404);
    return item;
  }
}
