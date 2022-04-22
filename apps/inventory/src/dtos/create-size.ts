import { OmitType } from '@nestjs/swagger';
import { VariationDto } from './variation';


export class CreateVariationSizeDto extends OmitType(VariationDto, ['type', 'image', 'color', 'name'] as const) { }
