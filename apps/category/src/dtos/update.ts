import { OmitType } from '@nestjs/swagger';
import { CategoryDto } from './category';

export class UpdatetegoryDto extends OmitType(CategoryDto, [
  'parent',
  'subCategories',
] as const) {}
