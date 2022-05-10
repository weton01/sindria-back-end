import { UserEntity } from '@/auth/entities/user';
import { ProductEntity } from '@/product/entities/product';
import { ReviewEntity } from '@/review/entities/review';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStoreEntity } from './order-store';

@Entity({ name: 'orders_by_product' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  grossAmount: number;

  @Column()
  netAmount: number;

  @Column()
  quantity: number;

  @Column("simple-json")
  freezeProduct: ProductEntity;
 
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => OrderStoreEntity, (orderStore) => orderStore.products)
  orderStore: OrderStoreEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  product: ProductEntity

  @ManyToOne(() => UserEntity, (user) => user.productOrders)
  user: UserEntity;

  @OneToMany(() => ReviewEntity, (user) => user.orderProduct)
  reviews: ReviewEntity[];

  constructor(entity?: Partial<OrderProductEntity>) {
    this.id = entity?.id;
  }
}
