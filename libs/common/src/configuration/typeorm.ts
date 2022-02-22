import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '.';
import { UserEntity, TeacherEntity, SkillEntity, FormationEntity } from '../entities';

export const TypeormConfig = TypeOrmModule.forRoot({
  type: 'mongodb',
  url: `${envs.MONGO_URI}`,
  entities: [UserEntity, TeacherEntity, SkillEntity, FormationEntity],
  ssl: true,
  authSource: 'admin',
});
