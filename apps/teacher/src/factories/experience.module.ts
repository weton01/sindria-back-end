import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, TeacherEntity, ExperienceEntity } from '@app/common';
import { ExperienceService } from '../services/experience.service';
import { ExperienceController } from '../controllers/experience.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, UserEntity, ExperienceEntity]),
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
