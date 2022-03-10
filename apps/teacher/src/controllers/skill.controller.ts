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
import { CreateSkillDto, FilterSkillDto, UpdateSkillDto } from '../dtos';
import { TeacherService } from '../services';
import { SkillService } from '../services';

@Controller('/skill')
export class SkillController {
  constructor(
    private readonly skillService: SkillService,
    private readonly teacherService: TeacherService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createSkill(
    @Req() req: any,
    @Body() skillDto: CreateSkillDto,
  ): Promise<any> {
    const { user } = req;
    const foundTeacher = await this.teacherService.findOne({
      'user.id': user.id,
    });

    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    const foundSkill = await this.skillService.findOne({
      name: skillDto.name,
    });

    if (foundSkill) {
      const strErr = 'essa habilidade já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    const skill = await this.skillService.create(skillDto);
    foundTeacher.skills = [...(foundTeacher.skills || []), skill];

    await this.teacherService.update(foundTeacher.id, foundTeacher);

    return skill;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateSkill(
    @Req() req: any,
    @Param('id') id: string,
    @Body() skillDto: UpdateSkillDto,
  ): Promise<any> {
    const { user } = req;
    const foundSkillId = await this.skillService.findById(id);

    if (!foundSkillId) {
      const strErr = 'id não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const foundTeacher = await this.teacherService.findOne({
      'user.id': user.id,
    });

    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const foundSkill = await this.skillService.findOne({
      name: skillDto.name,
    });

    if (foundSkill) {
      const strErr = 'essa habilidade já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    await this.skillService.update(id, skillDto);

    const filterSkillDto = new FilterSkillDto();
    const skills = await this.skillService.find(filterSkillDto);

    foundTeacher.skills = skills;
    await this.teacherService.update(foundTeacher.id, foundTeacher);

    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteSkill(@Param('id') id: string, @Req() req: any): Promise<any> {
    const { user } = req;

    const skill = await this.skillService.delete(id);
    if (skill.affected === 0) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const foundTeacher = await this.teacherService.findOne({
      'user.id': user.id,
    });

    const filterSkillDto = new FilterSkillDto();
    const skills = await this.skillService.find(filterSkillDto);
    foundTeacher.skills = skills;

    await this.teacherService.update(foundTeacher.id, foundTeacher);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getByIdSkill(@Param('id') id: string): Promise<any> {
    const skill = await this.skillService.findById(id);
    if (skill === undefined) {
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return skill;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterSkill(@Query() params: FilterSkillDto): Promise<any> {
    const skill = await this.skillService.find(params);
    return skill;
  }
}
