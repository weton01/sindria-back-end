import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductDto } from './product';

class AuxDto extends PartialType(ProductDto) {}

export class UpdateProductDto extends OmitType(AuxDto, ['name'] as const) {}
