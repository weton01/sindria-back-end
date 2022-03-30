import { OmitType } from '@nestjs/swagger';
import { CategoryDto } from './category';
 
export class CreateCategoryDto extends OmitType(CategoryDto, ['parent', 'subCategories'] as const) { }
