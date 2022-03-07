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
import { ObjectID } from 'mongodb';
import { CreateTeacherDto, FilterTeacherDto, UpdateTeacherDto } from '../dtos';
import { SkillEntity } from '../entities';
import { TeacherService } from '../services/teacher.service';

@Controller('/teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService, 
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createTeacher(
    @Req() req: any,
    @Body() teacherDto: CreateTeacherDto,
  ): Promise<any> {
    const { user } = req;
 
    const foundTeacher = await this.teacherService.findOne({
      user: { _id: new ObjectID(user._id) },
    });

    if (!foundTeacher) {
      throw new HttpException(
        'este usuário já é um professor, tente outro email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity(user);
    teacherDto.user = newUser;

    const teacher = await this.teacherService.create(teacherDto);
    return { teacher };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:_id')
  async updateTeacher(
    @Param('_id') _id: string,
    @Body() teacherDto: UpdateTeacherDto,
  ): Promise<any> {
    const foundTeacher = await this.teacherService.findById(_id);
    if (!foundTeacher) {
      throw new HttpException(
        'professor não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.teacherService.update(_id, teacherDto);
    const foundTeacherUpdated = await this.teacherService.findById(_id);
    return foundTeacherUpdated;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:_id')
  async deleteTeacher(@Param('_id') _id: string): Promise<any> {
    const foundTeacher = await this.teacherService.findById(_id);

    if (!foundTeacher) {
      throw new HttpException(
        'professor não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const teacher = await this.teacherService.delete(_id);
    return teacher.affected === 1
      ? { message: 'successfully deleted!' }
      : { message: 'id not found!' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  async getByIdTeacher(@Param('_id') _id: string): Promise<any> {
    const foundTeacher = await this.teacherService.findById(_id);

    if (!foundTeacher) {
      throw new HttpException(
        'professor não encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const teacher = await this.teacherService.findById(_id);
    return { teacher };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async filterTeacher(@Query() params: FilterTeacherDto): Promise<any> {
    const teacher = await this.teacherService.find(params);
    return teacher;
  }
}
