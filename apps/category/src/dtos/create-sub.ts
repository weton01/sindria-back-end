import { OmitType } from '@nestjs/swagger';
import { CategoryDto } from './category';
 
export class CreateSubCategoryDto extends OmitType(CategoryDto, ['subCategories'] as const) { }
