import { OmitType } from '@nestjs/swagger';
import { StoreDto } from './store';

export class UpdateStoreDto extends OmitType(StoreDto, [
  'name',
  'meta',
] as const) {}