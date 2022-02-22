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
  CreateTeacherDto, 
  FilterTeacherDto, 
  UpdateTeacherDto,
} from '../dtos';
import { TeacherService } from '../services/teacher.service';

@Controller('/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('/')
  async createTeacher(@Body() teacherDto: CreateTeacherDto): Promise<any> {
    const teacher = await this.teacherService.create(teacherDto);
    return { teacher };
  }

  @Patch('/:_id')
  async updateTeacher(@Param('_id') _id: string, @Body() teacherDto: UpdateTeacherDto): Promise<any> {
    const teacher = await this.teacherService.update(_id, teacherDto);
    return { teacher };
  }

  @Delete('/:_id')
  async deleteTeacher(@Param('_id') _id: string): Promise<any> {
    const teacher = await this.teacherService.delete(_id)
    return teacher.affected === 1
      ? { message: 'successfully deleted!' }
      : { message: 'id not found!' };
  }

  @Get('/:_id')
  async getByIdTeacher(@Param('_id') _id: string): Promise<any> { 
    const teacher = await this.teacherService.findById(_id); 
    return teacher !== undefined? { teacher } : {message: "id not found"};
  }

  @Get('/')
  async filterTeacher(@Query() params: FilterTeacherDto): Promise<any> { 
    const teacher = await this.teacherService.find(params)
    return { teacher }
  }
}
