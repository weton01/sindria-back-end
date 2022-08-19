import { UserEntity } from '@/auth/entities/user';
import { BrandEntity } from '@/brand/entities/brand';
import { CategoryEntity } from '@/category/entities/category';
import { CommentEntity } from '@/comment/entities/comment';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { VariationEntity } from '@/inventory/variation/entities/variation';
import { OrderProductEntity } from '@/order/entities/order-product';
import { ReviewEntity } from '@/review/entities/review';
import { StoreEntity } from '@/store/entities/store';
import { TagEntity } from '@/tag/entities/tag';
import { UnitMeasurement } from '@app/common/enums/unit-measurement';
import { floatTransformer } from '@app/common/transformers/float';
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

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

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
  weight: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  height: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  length: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  width: number;

  @Column()
  minSale: number;

  @Column({
    type: 'enum',
    enum: UnitMeasurement,
  })
  unitMeasurement: UnitMeasurement;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  rating: number;

  @Column({ default: 0 })
  reviewsQuantity: number;

  @Column({ default: 0 })
  salesQuantity: number;

  @Column({ default: true })
  active: boolean;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => VariationEntity, (variation) => variation.product)
  variations: VariationEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.product)
  comments: CommentEntity[];

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity[];

  @OneToMany(() => MutationEntity, (mutation) => mutation.product)
  mutations: OrderProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @ManyToOne(() => UserEntity, (user) => user.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  brand: BrandEntity;

  @ManyToOne(() => StoreEntity, (store) => store.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  store: StoreEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  momCategories: CategoryEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, (tag) => tag.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  tags: TagEntity[];
  

  constructor(entity?: Partial<ProductEntity>) {
    this.id = entity?.id;
  }
}
