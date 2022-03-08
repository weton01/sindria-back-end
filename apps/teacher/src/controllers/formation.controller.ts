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
} from '@nestjs/common';
import {
  CreateFormationDto,
  FilterFormationDto,
  UpdateFormationDto,
} from '../dtos';
import { FormationService } from '../services/formation.service';

@Controller('/formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Post('/')
  async createFormation(
    @Body() formationDto: CreateFormationDto,
  ): Promise<any> {
    const formation = await this.formationService.create(formationDto);
    return { formation };
  }

  @Patch('/:_id')
  async updateFormation(
    @Param('_id') _id: string,
    @Body() formationDto: UpdateFormationDto,
  ): Promise<any> {
    const formation = await this.formationService.update(_id, formationDto);
    return { formation };
  }

  @Delete('/:_id')
  async deleteFormation(@Param('_id') _id: string): Promise<any> {
    const formation = await this.formationService.delete(_id);
    if (formation.affected === 0) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:_id')
  async getByIdFormation(@Param('_id') _id: string): Promise<any> {
    const formation = await this.formationService.findById(_id);
    if (formation === undefined) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/')
  async filterFormation(@Query() params: FilterFormationDto): Promise<any> {
    const formation = await this.formationService.find(params);
    return { formation };
  }
}
