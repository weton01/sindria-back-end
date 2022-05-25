import { OmitType } from '@nestjs/swagger';
import { VariationDto } from './variation';

export class CreateVariationColorDto extends OmitType(VariationDto, [
  'type',
  'image',
  'size',
  'name',
] as const) {}
