import { OmitType } from '@nestjs/swagger';
import { VariationDto } from './variation';

export class CreateVariationSizeDto extends OmitType(VariationDto, [
  'type',
  'images',
  'color',
  'name',
] as const) {}
