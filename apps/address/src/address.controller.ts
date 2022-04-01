import { JwtAuthGuard } from '@app/utils';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create';
import { UpdateAddressDto } from './dtos/update';
import { AddressEntity } from './entities/address';

@Controller()
export class AddressController {
  constructor(
    private readonly addressService: AddressService
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAddress(@Req() req, @Body() dto: CreateAddressDto): Promise<any> {
    const { user } = req;

    return await this.addressService.create(user.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateAddress(@Param('id') id: string, @Body() dto: UpdateAddressDto): Promise<any> {
    return await this.addressService.update(id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteAddress(@Param('id') id: string): Promise<any> {
    return await this.addressService.delete(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAddress(@Query() query: AddressEntity): Promise<any> {
    return await this.addressService.find(query)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findAddressById(@Param('id') id: string): Promise<any> {
    return await this.addressService.findById(id)
  }

}
