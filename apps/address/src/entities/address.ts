import { UserEntity } from '@/auth/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cep: string;

  @Column()
  state: string

  @Column()
  city: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
  
  @ManyToOne(() => UserEntity, (user) => user.addreesses)
  user: UserEntity;

  constructor(entity?: Partial<AddressEntity>) {
    this.id = entity?.id;
  }
}
