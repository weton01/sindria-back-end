import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create';
import { FindAddressDto } from './dtos/find';
import { UpdateAddressDto } from './dtos/update';

@Controller()
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAddress(@Req() req, @Body() dto: CreateAddressDto): Promise<any> {
    const { user } = req;

    return await this.addressService.create(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateAddress(
    @Req() req,
    @Param('id') id: string,
    @Body() dto: UpdateAddressDto,
  ): Promise<any> {
    const { user } = req;

    return await this.addressService.update(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteAddress(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.addressService.delete(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAddress(@Query() query: FindAddressDto, @Req() req): Promise<any> {
    const { user } = req;

    const [items, count] = await this.addressService.find(query, user.id);
    return { items, count }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findAddressById(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.addressService.findById(user.id, id);
  }
}
