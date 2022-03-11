import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceService } from '../services/experience.service';
import { ExperienceController } from '../controllers/experience.controller';
import { ExperienceEntity, TeacherEntity } from '../entities';
import { UserEntity } from '@/auth/entities';
import { TeacherService } from '../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, UserEntity, ExperienceEntity]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService, TeacherService],
})
export class ExperienceModule {}
