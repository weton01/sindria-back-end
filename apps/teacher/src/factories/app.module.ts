import { SkillEntity, UserEntity } from '@app/common';
import { TeacherEntity } from '@app/common/entities/teacher.entity';
import { envs } from '@app/utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationModule } from './formation.module';
import { SkillModule } from './skill.module';
import { TeacherModule } from './teacher.module';

@Module({
  imports: [
    FormationModule,
    TeacherModule,
    SkillModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `${envs.MONGO_URI}`,
      entities: [TeacherEntity, UserEntity, SkillEntity],
      ssl: true,
      authSource: 'admin',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
