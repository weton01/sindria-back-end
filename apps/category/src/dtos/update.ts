import { OmitType, PartialType } from '@nestjs/swagger';
import { CategoryDto } from './category';

class AuxDto extends OmitType(CategoryDto, [
  'parent',
  'subCategories',
  'name',
] as const) {}

export class UpdatetegoryDto extends PartialType(AuxDto) {}
