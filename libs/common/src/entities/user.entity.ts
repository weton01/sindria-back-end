import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TaskEntity } from '.';

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

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.password = entity?.password;
  }
}
