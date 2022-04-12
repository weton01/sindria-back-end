import { PartialType } from '@nestjs/swagger';
import { BrandDto } from './brand';

export class UpdateBrandDto extends PartialType(BrandDto) {}
