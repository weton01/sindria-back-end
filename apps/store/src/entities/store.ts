import { AddressEntity } from '@/address/entities/address';
import { UserEntity } from '@/auth/entities/user';
import { floatTransformer } from '@app/common/transformers/float';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'stores' })
export class StoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('simple-array')
  images: string[];

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => UserEntity, (user) => user.store)
  user: UserEntity;

  @OneToOne(() => AddressEntity, (address) => address.store, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address: AddressEntity;

  constructor(entity?: Partial<StoreEntity>) {
    this.id = entity?.id;
  }
}
