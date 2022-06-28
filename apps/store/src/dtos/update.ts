import { OmitType, PartialType } from '@nestjs/swagger';
import { StoreDto } from './store';

export class UpdateStoreDto extends OmitType(StoreDto, [
  'name',
  'images'
] as const) {}