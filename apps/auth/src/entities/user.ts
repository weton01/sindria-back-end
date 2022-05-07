import { AddressEntity } from '@/address/entities/address';
import { CommentEntity } from '@/comment/entities/comment';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { OrderProductDto } from '@/order/dtos/order-product';
import { OrderEntity } from '@/order/entities/order';
import { OrderProductEntity } from '@/order/entities/order-product';
import { OrderStoreEntity } from '@/order/entities/order-store';
import { UserTypes } from '@app/common/enums/user-type';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'apps/product/src/entities/product';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
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
    type: "enum",
    enum: UserTypes,
    default: UserTypes.customer
  })
  type: UserTypes;

  @ApiProperty()
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => AddressEntity, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  addresses: AddressEntity[];

  @OneToMany(() => CreditCardEntity, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  creditCards: AddressEntity[];

  @OneToMany(() => ProductEntity, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  products: ProductEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  comments: CommentEntity[];

  @OneToMany(() => OrderEntity, (comment) => comment.purchaser, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  orders: OrderEntity[];

  @OneToMany(() => OrderStoreEntity, (orderStore) => orderStore.store, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  sales: OrderStoreEntity[];

  @OneToMany(() => OrderProductEntity, (comment) => comment.user, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  productOrders: OrderProductEntity[];

  constructor(entity?: Partial<UserEntity>) {
    this.id = entity?.id;
    this.username = entity?.username;
    this.email = entity?.email;
    this.activationCode = entity?.activationCode;
    this.active = entity?.active;
  }
}
