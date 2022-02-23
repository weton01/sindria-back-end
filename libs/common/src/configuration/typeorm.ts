import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '.';
import {
  UserEntity,
  TeacherEntity,
  SkillEntity,
  FormationEntity,
  ExperienceEntity,
  TaskEntity,
} from '../entities';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: `${envs.MONGO_URI}`,
  entities: [
    UserEntity,
    TeacherEntity,
    SkillEntity,
    FormationEntity,
    ExperienceEntity,
    TaskEntity,
  ],
  ssl: true,
  authSource: 'admin',
});
