import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { CreditCardEntity } from '@/credit-card/entities/credit-card';
import { StoreEntity } from '@/store/entities/store';
import { InvoiceTypes } from '@app/common/enums/invoice-types';

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

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  freezePurchaser: UserEntity;

  @Column({
    type: 'enum',
    enum: InvoiceTypes,
  })
  invoiceType: InvoiceTypes;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => AddressEntity, (address) => address.orders, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  address: AddressEntity;

  @ManyToOne(() => CreditCardEntity, (creditCard) => creditCard.orders, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  creditCard: CreditCardEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  purchaser: UserEntity;

  @OneToMany(() => OrderStoreEntity, (variation) => variation.order)
  ordersStores: OrderStoreEntity[];

  constructor(entity?: Partial<OrderEntity>) {
    this.id = entity?.id;
  }
}
