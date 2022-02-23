import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '.';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  description: string;

  @Column()
  teacherId: string;

  @Column()
  courseId: string;

  @Column('boolean', { default: false })
  teacherConfirmation: boolean;

  @Column('boolean', { default: false })
  userConfirmation: boolean;

  @Column({ type: 'timestamptz' })
  taskInitDate: Date;

  @Column({ type: 'timestamptz' })
  taskEndDate: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  constructor(entity?: Partial<TaskEntity>) {
    this._id = entity?._id;
  }
}