import { Entity, ObjectIdColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { FormationEntity } from './';
import { UserEntity, SkillEntity } from './'; 
import { ExperienceEntity } from './experience.entity';

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

  @OneToMany(() => SkillEntity, skill => skill.teacher)
  skills: SkillEntity[];

  @OneToMany(() => FormationEntity, formation => formation.teacher)
  formations: FormationEntity[];
  
  @OneToMany(() => ExperienceEntity, experience => experience.teacher)
  experiences: FormationEntity[];

  @CreateDateColumn()
  created_at: Date;
      
  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id; 
  }
}
