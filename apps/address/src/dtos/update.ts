import { PartialType } from '@nestjs/swagger';
import { AddressDto } from './adddress';

export class UpdateAddressDto extends PartialType(AddressDto) {}
