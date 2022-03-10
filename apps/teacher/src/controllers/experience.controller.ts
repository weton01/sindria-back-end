import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateExperienceDto,
  FilterExperienceDto,
  UpdateExperienceDto,
} from '../dtos';
import { ExperienceService } from '../services/experience.service';

@Controller('/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post('/')
  async createExperience(
    @Body() experienceDto: CreateExperienceDto,
  ): Promise<any> {
    const experience = await this.experienceService.create(experienceDto);
    return { experience };
  }

  @Patch('/:id')
  async updateExperience(
    @Param('id') id: string,
    @Body() experienceDto: UpdateExperienceDto,
  ): Promise<any> {
    const experience = await this.experienceService.update(id, experienceDto);
    return { experience };
  }

  @Delete('/:id')
  async deleteExperience(@Param('id') id: string): Promise<any> {
    const experience = await this.experienceService.delete(id);
    return experience.affected === 1
      ? { message: 'successfully deleted!' }
      : { message: 'id not found!' };
  }

  @Get('/:id')
  async getByIdExperience(@Param('id') id: string): Promise<any> {
    const experience = await this.experienceService.findById(id); 
    return experience !== undefined? { experience } : {message: "id not found"};
  }

  @Get('/')
  async filterExperience(@Query() params: FilterExperienceDto): Promise<any> {
    const experience = await this.experienceService.find(params);
    return { experience };
  }
}
