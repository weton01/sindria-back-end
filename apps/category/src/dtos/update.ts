import { OmitType, PartialType } from '@nestjs/swagger';
import { CategoryDto } from './category';

class AuxDto extends PartialType(CategoryDto){}

export class UpdatetegoryDto extends OmitType(AuxDto, [
  'parent',
  'subCategories',
] as const) {}
