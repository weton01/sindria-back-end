import { TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common'; 
import { ExperienceModule } from './experience.module';
import { FormationModule } from './formation.module';
import { SkillModule } from './skill.module';
import { TeacherModule } from './teacher.module';


@Module({
  imports: [FormationModule, TeacherModule, SkillModule, ExperienceModule, TypeormConfig],
  controllers: [],
  providers: [],
})
export class AppModule {}
