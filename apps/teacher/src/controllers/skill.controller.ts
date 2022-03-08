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
      'user._id': user._id,
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

    await this.teacherService.update(foundTeacher._id, foundTeacher);

    return skill;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:_id')
  async updateSkill(
    @Req() req: any,
    @Param('_id') _id: string,
    @Body() skillDto: UpdateSkillDto,
  ): Promise<any> {
    const { user } = req; 
    const foundSkillId = await this.skillService.findById(_id);

    if (!foundSkillId) {
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

    const foundSkill = await this.skillService.findOne({
      name: skillDto.name,
    }); 

    if (foundSkill) {
      const strErr = 'essa habilidade já existe';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    } 

    await this.skillService.update(_id, skillDto);

    const filterSkillDto = new FilterSkillDto()
    const skills = await this.skillService.find(filterSkillDto);
    
    foundTeacher.skills = skills;
    await this.teacherService.update(foundTeacher._id, foundTeacher)
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:_id')
  async deleteSkill(@Param('_id') _id: string): Promise<any> {
    const skill = await this.skillService.delete(_id);
    if(skill.affected === 0){
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getByIdSkill(@Param('_id') _id: string): Promise<any> {
    const skill = await this.skillService.findById(_id);
    if(skill === undefined){
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    return skill
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterSkill(@Query() params: FilterSkillDto): Promise<any> {
    const skill = await this.skillService.find(params);
    return skill;
  }
}
