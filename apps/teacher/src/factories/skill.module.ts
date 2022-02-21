import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity, UserEntity } from '@app/common';
import { TeacherEntity } from '@app/common/entities/teacher.entity';  
import { SkillController } from '../controllers/skill.controller';
import { SkillService } from '../services/skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TeacherEntity, SkillEntity])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
