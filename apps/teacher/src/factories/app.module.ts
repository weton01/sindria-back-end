import { TypeormConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { FormationModule } from './formation.module';
import { SkillModule } from './skill.module';
import { TeacherModule } from './teacher.module';

@Module({
  imports: [FormationModule, TeacherModule, SkillModule, TypeormConfig],
  controllers: [],
  providers: [],
})
export class AppModule {}
