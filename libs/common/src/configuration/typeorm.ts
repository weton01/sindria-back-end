import { UserEntity } from '@/auth/entities';
import { TaskEntity } from '@/calendar/entities';
import {
  ExperienceEntity,
  FormationEntity,
  SkillEntity,
  TeacherEntity,
} from '@/teacher/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '.';

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
