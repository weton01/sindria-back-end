import { UserEntity } from '@/auth/entities/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StoreEntity } from './store';

@Entity({ name: 'integrations' })
export class IntegrationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  identity: string;

  @Column('simple-json')
  meta: any;

  @Column('simple-json')
  webhook: any;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => StoreEntity, (store) => store.paymentIntegration, {
    onDelete: 'CASCADE',
  })
  store: StoreEntity;

  @ManyToOne(() => UserEntity, (user) => user.integrations, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  constructor(entity?: Partial<IntegrationEntity>) {
    this.id = entity?.id;
  }
}
