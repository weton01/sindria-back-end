import { UserEntity } from '@/auth/entities';

import {
  Entity,
  ObjectIdColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { FormationEntity, SkillEntity, ExperienceEntity } from '.';

@Entity({ name: 'teachers' })
export class TeacherEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column(() => UserEntity)
  user: UserEntity;

  @Column(() => SkillEntity)
  skills: SkillEntity[];

  @Column(() => FormationEntity)
  formations: FormationEntity[];

  @Column(() => ExperienceEntity)
  experiences: FormationEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<TeacherEntity>) {
    this.description = entity?.description;
    this.rating = entity?.rating;
    this.user = entity?.user;
    this.skills = entity?.skills;
    this.formations = entity?.formations;
    this.experiences = entity?.experiences;
  }
}
