import { UserEntity } from '@/auth/entities';
import { AuthService } from '@/auth/services';
import { BcryptAdapter } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 import { SkillController } from '../controllers/skill.controller';
import { SkillEntity, TeacherEntity } from '../entities';
import { TeacherService } from '../services';
import { SkillService } from '../services/skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TeacherEntity, SkillEntity])],
  controllers: [SkillController],
  providers: [SkillService ,TeacherService, AuthService, BcryptAdapter],
})
export class SkillModule {}
