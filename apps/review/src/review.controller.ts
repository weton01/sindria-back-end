import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from './dtos/create';
import { FindReviewDto } from './dtos/find';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/:orderProductId')
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Req() req,
    @Param('orderProductId') orderProductId: string,
    @Body() dto: CreateReviewDto,
  ): Promise<any> {
    const { user } = req;

    return await this.reviewService.create(user.id, orderProductId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteProduct(@Req() req, @Param('id') id: string): Promise<any> {
    const { user } = req;

    return await this.reviewService.delete(user.id, id);
  }

  @Get('/:productId')
  async findProduct(@Query() query: FindReviewDto, @Param('productId') productId): Promise<any> {
    const [items, count] = await this.reviewService.find(query, productId);
    return { items, count };
  }
}
