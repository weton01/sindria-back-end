import { UserEntity } from '@/auth/entities/user';
import { BrandEntity } from '@/brand/entities/brand';
import { CategoryEntity } from '@/category/entities/category';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { ProductEntity } from '@/product/entities/product';
import { ReviewEntity } from '@/review/entities/review';
import { floatTransformer } from '@app/utils/transformes/entities/float';
import { Transform } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column({
    type: 'numeric', 
    precision: 10, 
    scale: 2, 
    transformer: floatTransformer,
  })
  grossAmount: number;

  @Column({
    type: 'numeric', 
    precision: 10, 
    scale: 2, 
    transformer: floatTransformer,
  })
  netAmount: number;

  @Column({
    type: 'numeric', 
    precision: 10, 
    scale: 2, 
    transformer: floatTransformer,
  })
  quantity: number;

  @Column('simple-json')
  freezeProduct: any;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => ReviewEntity, (review) => review.orderProduct)
  reviews: ReviewEntity[];

  @ManyToOne(() => OrderStoreEntity, (orderStore) => orderStore.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orderStore: OrderStoreEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.orderProducts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand: BrandEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => MutationEntity, (mutation) => mutation.orderProducts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mutation: MutationEntity;

  @ManyToOne(() => UserEntity, (user) => user.productOrders, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.orderProducts, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  categories: CategoryEntity[];

  constructor(entity?: Partial<OrderProductEntity>) {
    this.id = entity?.id;
  }
}
