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
    @Req() req: any,
    @Body() formationDto: CreateFormationDto,
  ): Promise<any> {
    const { user } = req;
    const foundTeacher = await this.teacherService.findOne({
      'user._id': user._id,
    });

    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    const foundFormation = await this.formationService.findOne({
      name: formationDto.name,
    });

    if (foundFormation) {
      const strErr = 'essa formação já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    const formation = await this.formationService.create(formationDto);
    foundTeacher.formations = [...(foundTeacher.formations || []), formation];

    await this.teacherService.update(foundTeacher._id, foundTeacher);

    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:_id')
  async updateFormation(
    @Req() req: any,
    @Param('_id') _id: string,
    @Body() formationDto: UpdateFormationDto,
  ): Promise<any> {
    const { user } = req;   

    const foundFormationId = await this.formationService.findById(_id); 
    if (!foundFormationId) {
      const strErr = 'id não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    } 
  
    const foundTeacher = await this.teacherService.findOne({
      'user._id': user._id,
    }); 
    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    
    const foundFormation = await this.formationService.findOne({
      name: formationDto.name,
    }); 
    if (foundFormation) {
      const strErr = 'essa habilidade já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    } 

    await this.formationService.update(_id, formationDto);
    const filterFormationDto = new FilterFormationDto()
    const formations = await this.formationService.find(filterFormationDto);
    foundTeacher.formations = formations;
    await this.teacherService.update(foundTeacher._id, foundTeacher)
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:_id')
  async deleteFormation(@Param('_id') _id: string, @Req() req: any): Promise<any> {
    const { user } = req; 
    const formation = await this.formationService.delete(_id);
    if (formation.affected === 0) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    
    const foundTeacher = await this.teacherService.findOne({
      'user._id': user._id,
    }); 

    const filterSkillDto = new FilterFormationDto()
    const formations = await this.formationService.find(filterSkillDto);
    foundTeacher.formations = formations;

    await this.teacherService.update(foundTeacher._id, foundTeacher)
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getByIdFormation(@Param('_id') _id: string): Promise<any> {
    const formation = await this.formationService.findById(_id);
    if (formation === undefined) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return formation
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterFormation(@Query() params: FilterFormationDto): Promise<any> {
    const formation = await this.formationService.find(params);
    return formation;
  }
}
