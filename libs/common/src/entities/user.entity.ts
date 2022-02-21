import { Entity, ObjectIdColumn, Column, OneToOne } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

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

  @Column()
  created_at?: Date;

  @Column()
  updated_ate?: Date;

  @Column({ length: 4 })
  activationCode: string;

  @Column('boolean', { default: false })
  active: boolean;

  @OneToOne(type => TeacherEntity, teacher => teacher.user)
  teacher: TeacherEntity;

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.password = entity?.password;
  }
}
