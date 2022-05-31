import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateVariationColorDto } from './dtos/create-color';
import { CreateVariationDefaultDto } from './dtos/create-default';
import { CreateVariationSizeDto } from './dtos/create-size';
import { UpdateVariationDefaultDto } from './dtos/update-default';
import { VariationsService } from './variation.service';

@Controller('/variation')
export class VariationController {
  constructor(private readonly inventoryService: VariationsService) {}

  @Post('/default/:productId')
  @UseGuards(JwtAuthGuard)
  async createDefaultVariation(
    @Req() req,
    @Body() dto: CreateVariationDefaultDto,
    @Param('productId') productId,
  ): Promise<any> {
    const { user } = req;

    return await this.inventoryService.createDefault(user.id, productId, dto);
  }

  @Post('/size/:productId')
  @UseGuards(JwtAuthGuard)
  async createSizeVariation(
    @Req() req,
    @Body() dto: CreateVariationSizeDto,
    @Param('productId') productId,
  ): Promise<any> {
    const { user } = req;

    return await this.inventoryService.createSize(user.id, productId, dto);
  }

  @Post('/color/:productId')
  @UseGuards(JwtAuthGuard)
  async createColorVariation(
    @Req() req,
    @Body() dto: CreateVariationColorDto,
    @Param('productId') productId,
  ): Promise<any> {
    const { user } = req;

    return await this.inventoryService.createColor(user.id, productId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/default/:id')
  async updateBrandVariation(
    @Req() req,
    @Body() dto: UpdateVariationDefaultDto,
    @Param('id') id,
  ): Promise<any> {
    const { user } = req;

    return await this.inventoryService.updateDefault(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/size/:id')
  async updateSizeVariation(
    @Req() req,
    @Body() dto: UpdateVariationDefaultDto,
    @Param('id') id,
  ): Promise<any> {
    const { user } = req;

    return await this.inventoryService.updateSize(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/color/:id')
  async updateColorVariation(
    @Req() req,
    @Body() dto: UpdateVariationDefaultDto,
    @Param('id') id,
  ): Promise<any> {
    const { user } = req;

    return await this.inventoryService.updateColor(user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteVariation(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.inventoryService.delete(user.id, id);
    return {};
  }
}
