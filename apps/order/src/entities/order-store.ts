import { UserEntity } from '@/auth/entities/user';
import { OrderStatus } from '@app/common/enums/order-status.';
import { floatTransformer } from '@app/common/transformers/float';

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

  @Column()
  shippingAmount: number;

  @Column({ nullable: true })
  trackingCode: string;

  @Column({
    type: 'date',
  })
  trackingEstimated: Date;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  feeAmount: number;

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
  orderProducts: OrderProductEntity[];

  @ManyToOne(() => UserEntity, (variation) => variation.sales, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  store: UserEntity;

  @ManyToOne(() => OrderEntity, (order) => order.ordersStores, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  constructor(entity?: Partial<OrderStoreEntity>) {
    this.id = entity?.id;
  }
}
