import { UserEntity } from '@/auth/entities';
import { AuthService } from '@/auth/services';
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
import { CreateTeacherDto, FilterTeacherDto, UpdateTeacherDto } from '../dtos';
import { TeacherService } from '../services/teacher.service';

@Controller('/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createTeacher(
    @Req() req: any,
    @Body() teacherDto: CreateTeacherDto,
  ): Promise<any> {
    const { user } = req;

    const foundTeacher = await this.teacherService.findOne({
      user: {id: user.id}
    });

    if (foundTeacher) {
      const strErr = 'este usuário já é um professor, tente outro email';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const newUser = new UserEntity(user);
    teacherDto.user = newUser;

    const teacher = await this.teacherService.create(teacherDto);
    return teacher;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateTeacher(
    @Param('id') id: string,
    @Body() teacherDto: UpdateTeacherDto,
  ): Promise<any> {
    const foundTeacher = await this.teacherService.findById(id);
    
    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    await this.teacherService.update(id, teacherDto);

    const foundTeacherUpdated = await this.teacherService.findById(id);
    return foundTeacherUpdated;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTeacher(@Param('id') id: string): Promise<any> {
    const foundTeacher = await this.teacherService.findById(id);
    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    const teacher = await this.teacherService.delete(id);
    if(teacher.affected === 0){
      const strErr = 'id não encotrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }

    return {}
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getByIdTeacher(@Param('id') id: string): Promise<any> {
    const foundTeacher = await this.teacherService.findById(id);

    if (!foundTeacher) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.NOT_FOUND);
    }
    const teacher = await this.teacherService.findById(id);
    return teacher;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterTeacher(@Query() params: FilterTeacherDto): Promise<any> {
    const teacher = await this.teacherService.find(params);
    return teacher;
  }
}
