import { UserEntity } from '@/auth/entities';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => UserEntity, (user) => user.teacher)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => SkillEntity, (skill) => skill.teacher) 
  @JoinColumn({ name: 'skillId', referencedColumnName: 'id' })
  skills: SkillEntity[];

  @OneToMany(() => FormationEntity, (formation) => formation.teacher) 
  @JoinColumn({ name: 'formationId', referencedColumnName: 'id' })
  formations: FormationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.teacher)
  @JoinColumn({ name: 'experienceId', referencedColumnName: 'id' })
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
