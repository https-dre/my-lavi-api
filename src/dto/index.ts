// Data Transfer Object
import { RemoveSha256Fields } from '../functions/remove-sensitive-fields';
import { OwnerModel } from '../models';

export type OwnerDTO = RemoveSha256Fields<OwnerModel>;