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
  CreateFormationDto,
  FilterFormationDto,
  UpdateFormationDto,
} from '../dtos';
import { TeacherService } from '../services';
import { FormationService } from '../services/formation.service';

@Controller('/formation')
export class FormationController {
  constructor(
    private readonly formationService: FormationService,
    private readonly teacherService: TeacherService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createFormation(
    @Req() req,
    @Body() formationDto: CreateFormationDto,
  ): Promise<any> {
    const { user } = req;

    const foundTeacher = await this.teacherService.findOne({
      user: { id: user.id },
    });

    if (!foundTeacher) {
      const strErr = 'professor não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const foundFormation = await this.formationService.findOne({
      name: formationDto.name,
    });

    if (foundFormation) {
      const strErr = 'essa formação já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    formationDto.teacher = foundTeacher;

    const formation = await this.formationService.create(formationDto);
    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateFormation(
    @Param('id') id: string,
    @Body() formationDto: UpdateFormationDto,
  ): Promise<any> {
    const foundFormationId = await this.formationService.findById(id);
    if (!foundFormationId) {
      const strErr = 'id não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    const foundFormation = await this.formationService.findOne({
      name: formationDto.name,
    });

    if (foundFormation) {
      const strErr = 'essa habilidade já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    await this.formationService.update(id, formationDto);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteFormation(@Param('id') id: string): Promise<any> {
    const formation = await this.formationService.delete(id);
    if (formation.affected === 0) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getByIdFormation(@Param('id') id: string): Promise<any> {
    const formation = await this.formationService.findById(id);
    if (formation === undefined) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterFormation(@Query() params: FilterFormationDto): Promise<any> {
    const relations = ['teacher'];
    const formation = await this.formationService.find(params, relations);
    return formation;
  }
}
