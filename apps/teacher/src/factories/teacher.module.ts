import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common';
import { TeacherEntity } from '@app/common/entities/teacher.entity';
import { TeacherController } from '../controllers/teacher.controller';
import { TeacherService } from '../services/teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TeacherEntity])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
