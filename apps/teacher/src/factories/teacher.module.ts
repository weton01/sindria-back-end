import { UserEntity } from '@/auth/entities';
import { AuthService } from '@/auth/services';
import { BcryptAdapter, JwtStrategy } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from '../controllers/teacher.controller';
import { TeacherEntity } from '../entities';
import { TeacherService } from '../services/teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TeacherEntity])],
  controllers: [TeacherController],
  providers: [TeacherService, AuthService, JwtStrategy, BcryptAdapter],
})
export class TeacherModule {}
