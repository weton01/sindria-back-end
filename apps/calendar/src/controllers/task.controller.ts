import { AuthService } from '@/auth/services/';
import { TeacherService } from '@/teacher/services/teacher.service';
import { JwtAuthGuard } from '@app/utils/guards';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos';
import { TaskService } from '../services/task.service';

@Controller('calendar/task')
export class TaskController {
  constructor(
    private readonly authServie: AuthService,
    private readonly taskService: TaskService,
    private readonly mailerService: MailerService,
    private readonly teacherService: TeacherService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: any,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<any> {
    const { user } = req;

    /*
       Validar se teacher já existe
    */

    /*
      validar se o usuário já tem uma task na mesma hora
      e que já esteja confirmada pelo teacher
     */

    /*
      validar se o professor já tem uma task confirmada
      nessa mesma hora
    */

    const teacherFound = await this.teacherService.findOne({ user: user });

    if (!teacherFound) {
      const strErr = 'professor não encontrado';
      throw new HttpException(strErr, HttpStatus.BAD_REQUEST);
    }

    const taskFound = await this.taskService;
  }

  @Patch()
  update(): Promise<any> {
    return;
  }

  @Delete('/:_id')
  delete(@Param('_id') _id: string): Promise<any> {
    return;
  }

  @Get('/:_id')
  findById(@Param('_id') _id: string): Promise<any> {
    return;
  }

  @Get()
  filter(@Query() query: any): Promise<any> {
    return;
  }
}
