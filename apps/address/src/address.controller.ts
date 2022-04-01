import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getHello(): string {
    return this.addressService.getHello();
  }
}
