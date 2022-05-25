import { UserEntity } from '@/auth/entities/user';
import { OrderStatus } from '@app/common/enums/order-status.';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order';
import { OrderProductEntity } from './order-product';

@Entity({ name: 'orders_by_store' })
export class OrderStoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalAmount: number;

  @Column({ nullable: true })
  trackingCode: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.processed,
  })
  trackingStatus: OrderStatus;

  @Column({ nullable: true })
  trackingDate: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => OrderProductEntity, (order) => order.orderStore)
  products: OrderProductEntity[];

  @ManyToOne(() => UserEntity, (variation) => variation.sales)
  store: UserEntity;

  @ManyToOne(() => OrderEntity, (order) => order.ordersStore)
  order: OrderEntity;

  constructor(entity?: Partial<OrderStoreEntity>) {
    this.id = entity?.id;
  }
}
