import { UserEntity } from '@/auth/entities';
import { TaskEntity } from '@/calendar/entities';

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

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => SkillEntity, (skill) => skill.teacher)
  skills: SkillEntity[];

  @OneToMany(() => FormationEntity, (formation) => formation.teacher)
  formations: FormationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.teacher)
  experiences: FormationEntity[];

  @OneToMany(() => TaskEntity, (task) => task.teacher)
  teachers: TaskEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
  }
}
