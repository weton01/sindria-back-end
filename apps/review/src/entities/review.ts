import { UserEntity } from '@/auth/entities/user';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ProductEntity } from '@/product/entities/product';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column("simple-array")
  image: string[];

  @Column()
  rating: number;
 
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;

  @ManyToOne(() => OrderProductEntity, (orderProductEntity) => orderProductEntity.reviews)
  orderProduct: OrderProductEntity;
 
  constructor(entity?: Partial<ReviewEntity>) {
    this.id = entity?.id;
  }
}
