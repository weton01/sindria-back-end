import { OmitType } from '@nestjs/swagger';
import { VariationDto } from './variation';

export class CreateVariationColorDto extends OmitType(VariationDto, [
  'type',
  'images',
  'size',
  'name',
] as const) {}
