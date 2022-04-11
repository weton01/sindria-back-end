import { OmitType } from '@nestjs/swagger';
import { ProductDto } from './product';

export class UpdateProductDto extends OmitType(ProductDto, ['name'] as const) {}
