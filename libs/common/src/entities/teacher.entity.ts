import { Entity, ObjectIdColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity, SkillEntity } from './'; 

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
  skills: SkillEntity;

  @CreateDateColumn()
  created_at: Date;
      
  @UpdateDateColumn()
  updated_at: Date;

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id; 
  }
}
