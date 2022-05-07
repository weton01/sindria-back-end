import { UserEntity } from '@/auth/entities/user';
import { OrderEntity } from '@/order/entities/order';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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
  state: string;

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

  @OneToMany(() => OrderEntity, (order) => order.ordersStore)
  orders: OrderEntity;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;

  constructor(entity?: Partial<AddressEntity>) {
    this.id = entity?.id;
  }
}
