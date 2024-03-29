import { OmitType } from '@nestjs/swagger';
import { VariationDto } from './variation';

export class UpdateVariationSizeDto extends OmitType(VariationDto, [
  'images',
  'type',
  'color',
  'name',
  'size',
] as const) {}
