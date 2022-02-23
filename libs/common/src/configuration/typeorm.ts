import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '.';
import { UserEntity, TeacherEntity, SkillEntity, FormationEntity, ExperienceEntity } from '../entities';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: `${envs.MONGO_URI}`,
  entities: [UserEntity, TeacherEntity, SkillEntity, FormationEntity, ExperienceEntity],
  ssl: true,
  authSource: 'admin',
});
