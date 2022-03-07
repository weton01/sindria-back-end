import { TaskEntity } from '@/calendar/entities';
import { TeacherEntity } from '@/teacher/entities';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 4 })
  activationCode: string;

  @Column('boolean', { default: false })
  active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @OneToOne(() => TeacherEntity, (teacher) => teacher.user)
  teacher: TeacherEntity;

  
  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.activationCode = entity?.activationCode;
    this.active = entity?.active;
    this.tasks = entity?.tasks;
    this.teacher = entity?.teacher;
  }
}
