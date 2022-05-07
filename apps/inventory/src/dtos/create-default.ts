import { OmitType } from '@nestjs/swagger';
import { VariationDto } from './variation';


export class CreateVariationDefaultDto extends OmitType(VariationDto, ['type', 'color', 'size'] as const) { }
