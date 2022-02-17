import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 6 })
  activationCode: string;

  @Column({ default: false })
  active: boolean;

  constructor(entity?: Partial<UserEntity>) {
    this._id = entity?._id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.password = entity?.password;
  }
}
