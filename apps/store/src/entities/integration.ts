
import { AsaasCreateDigitalCCOutput } from '@app/utils/asaas/outputs/create-digitalcc';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @OneToOne(() => StoreEntity, (store) => store.paymentIntegration, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  store: StoreEntity;

  constructor(entity?: Partial<IntegrationEntity>) {
    this.id = entity?.id;
  }
}
