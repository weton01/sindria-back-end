import { AddressEntity } from '@/address/entities/address';
import { CommentEntity } from '@/comment/entities/comment';
import { CouponEntity } from '@/coupon/entities/coupon';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { MutationEntity } from '@/inventory/mutation/entities/mutation';
import { OrderEntity } from '@/order/entities/order';
import { OrderProductEntity } from '@/order/entities/order-product';
import { OrderStoreEntity } from '@/order/entities/order-store';
import { ProductEntity } from '@/product/entities/product';
import { ReviewEntity } from '@/review/entities/review';
import { IntegrationEntity } from '@/store/entities/integration';
import { StoreEntity } from '@/store/entities/store';
import { UserTypes } from '@app/common/enums/user-type';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'the name of user',
    example: 'any_username',
  })
  @Column()
  username: string;

  @ApiProperty({
    description: 'the name of user',
    example: 'any_email@mail.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column({ select: false })
  password: string;

  @ApiHideProperty()
  @Column({ length: 4, select: false })
  activationCode: string;

  @ApiHideProperty()
  @Column('boolean', { default: false, select: false })
  active: boolean;

  @ApiHideProperty()
  @Column({ default: false, select: false })
  isGoogle: boolean;

  @ApiHideProperty()
  @Column({ default: false, select: false })
  isFacebook: boolean;

  @ApiHideProperty()
  @Column({
    type: 'enum',
    enum: UserTypes,
    default: UserTypes.customer,
  })
  type: UserTypes;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => StoreEntity, (store) => store.user)
  @JoinColumn()
  stores: StoreEntity[];

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => CreditCardEntity, (credit) => credit.user)
  creditCards: CreditCardEntity[];

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => OrderEntity, (orders) => orders.purchaser)
  orders: OrderEntity[];

  @OneToMany(() => OrderStoreEntity, (orderStore) => orderStore.user)
  sales: OrderStoreEntity[];

  @OneToMany(() => OrderProductEntity, (productOrders) => productOrders.user)
  productOrders: OrderProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(() => MutationEntity, (mutation) => mutation.user)
  mutations: MutationEntity[];

  @OneToMany(() => CouponEntity, (coupons) => coupons.user)
  coupons: CouponEntity[];

  @OneToMany(() => IntegrationEntity, (integrations) => integrations.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  integrations: IntegrationEntity[];

  constructor(entity?: Partial<UserEntity>) {
    this.id = entity?.id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.activationCode = entity?.activationCode;
    this.active = entity?.active;
  }
}
