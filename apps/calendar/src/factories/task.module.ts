import { UserEntity } from '@/auth/entities';
import { AuthService } from '@/auth/services';
import { TeacherEntity } from '@/teacher/entities';
import { TeacherService } from '@/teacher/services';
import { JwtConfig, MailerConfig } from '@app/common';
import { JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/task.controller';
import { TaskEntity } from '../entities';
import { CalendarService } from '../services/calendar.service';
import { TaskService } from '../services/task.service';

@Module({
  imports: [
    MailerConfig,
    MailerConfig,
    JwtConfig,
    TypeOrmModule.forFeature([UserEntity, TeacherEntity, TaskEntity]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    JwtStrategy,
    AuthService,
    CalendarService,
    TeacherService,
  ],
})
export class TaskModule {}
