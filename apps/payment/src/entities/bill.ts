import { OrderEntity } from '@/order/entities/order';
import { floatTransformer } from '@app/common';
import {
  AsaasBillingType,
  AsaasChargeStatus,
  AsaasChargeStatusWebhook,
} from '@app/utils/asaas/enums/charge';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bills' })
export class BillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AsaasBillingType,
    nullable: false,
  })
  billingType: AsaasBillingType;

  @Column({
    type: 'enum',
    enum: AsaasChargeStatus,
    nullable: false,
  })
  status: AsaasChargeStatus;

  @Column({
    type: 'enum',
    enum: AsaasChargeStatusWebhook,
    nullable: false,
  })
  webhookStatus: AsaasChargeStatusWebhook;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  value: number;

  @Column()
  installmentCount: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: floatTransformer,
  })
  installmentValue: number;

  @Column({
    unique: true
  })
  extenalId: string;

  @Column()
  dueDate: Date;

  @Column('simple-json')
  meta: any;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToOne(() => OrderEntity, (order) => order.bills, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;

  constructor(entity?: Partial<BillEntity>) {
    this.id = entity?.id;
  }
}
