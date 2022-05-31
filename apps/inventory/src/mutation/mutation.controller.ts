import { JwtAuthGuard } from '@app/utils';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MutationDto } from './dtos/mutation';
import { MutationService } from './mutation.service';

@Controller('/mutation')
export class MutationController {
  constructor(private readonly mutationService: MutationService) {}

  @Post('/:productId')
  @UseGuards(JwtAuthGuard)
  async createMutation(
    @Req() req, 
    @Body() dto: MutationDto, 
    @Param('productId') productId: string
  ): Promise<any> {
    const { user } = req;

    return await this.mutationService.create(user.id, productId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteMutation(@Req() req, @Param('id') id): Promise<any> {
    const { user } = req;

    await this.mutationService.delete(user.id, id);
    return {};
  }
}
