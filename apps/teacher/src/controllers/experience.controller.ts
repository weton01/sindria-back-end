import { JwtAuthGuard } from '@app/utils/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateExperienceDto,
  FilterExperienceDto,
  UpdateExperienceDto,
} from '../dtos';
import { TeacherService } from '../services';
import { ExperienceService } from '../services/experience.service';

@Controller('/experience')
export class ExperienceController {
  constructor(
    private readonly experienceService: ExperienceService,
    private readonly teacherService: TeacherService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createExperience(
    @Req() req,
    @Body() experienceDto: CreateExperienceDto,
  ): Promise<any> {
    const { user } = req;

    const foundTeacher = await this.teacherService.findOne({
      user: { id: user.id },
    });

    if (!foundTeacher) {
      const strErr = 'professor não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const foundExperience = await this.experienceService.findOne({
      name: experienceDto.name,
    });

    if (foundExperience) {
      const strErr = 'essa experiência já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    } 
    experienceDto.teacher = foundTeacher;

    const experience = await this.experienceService.create(experienceDto);
    return experience;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateExperience(
    @Param('id') id: string,
    @Body() experienceDto: UpdateExperienceDto,
  ): Promise<any> {
    const foundExperienceId = await this.experienceService.findById(id);
    if (!foundExperienceId) {
      const strErr = 'id não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    const foundExperience = await this.experienceService.findOne({
      name: experienceDto.name,
    });

    if (foundExperience) {
      const strErr = 'essa experiência já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }
    const experience = await this.experienceService.update(id, experienceDto);
    return experience;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteExperience(@Param('id') id: string): Promise<any> {
    const experience = await this.experienceService.delete(id);
    if (experience.affected === 0) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getByIdExperience(@Param('id') id: string): Promise<any> {
    const experience = await this.experienceService.findById(id);
    if (experience === undefined) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return experience;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterExperience(@Query() params: FilterExperienceDto): Promise<any> {
    const experience = await this.experienceService.find(params);
    return  experience ;
  }
}
