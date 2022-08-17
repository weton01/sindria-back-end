import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { OrderStoreEntity } from '@/order/entities/order-store';
import { ProductEntity } from '@/product/entities/product';
import { floatTransformer } from '@app/common/transformers/float';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IntegrationEntity } from './integration';

@Entity({ name: 'stores' })
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('simple-array')
  images: string[];

  @Column({
    default: true,
    type: 'boolean'
  })
  active: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductEntity[]

  @OneToMany(() => OrderStoreEntity, (product) => product.store)
  sales: OrderStoreEntity[]

  @ManyToOne(() => UserEntity, (user) => user.stores, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.store, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: AddressEntity;

  @OneToOne(() => IntegrationEntity, (integration) => integration.store)
  @JoinColumn()
  paymentIntegration: IntegrationEntity;

  constructor(entity?: Partial<StoreEntity>) {
    this.id = entity?.id;
  }
}
