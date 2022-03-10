import { UserEntity } from '@/auth/entities';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FormationEntity, SkillEntity, ExperienceEntity } from '.';

@Entity({ name: 'teachers' })
export class TeacherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => SkillEntity, (skill) => skill.teacher)
  skills: SkillEntity[];

  @OneToMany(() => FormationEntity, (formation) => formation.teacher)
  formations: FormationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.teacher)
  experiences: ExperienceEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<TeacherEntity>) {
    this.id = entity?.id;
    this.description = entity?.description;
    this.rating = entity?.rating;
    this.user = entity?.user;
    this.skills = entity?.skills;
    this.formations = entity?.formations;
    this.experiences = entity?.experiences;
  }
}
