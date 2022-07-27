
import { Safe2PaySubAccount } from '@app/utils/safe2pay/interfaces/subaccount/safe2pay-subaccount';
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

  @Column()
  token: string;

  @Column('simple-json')
  meta: Safe2PaySubAccount;

  @OneToOne(() => StoreEntity, (store) => store.paymentIntegration)
  store: StoreEntity;

  constructor(entity?: Partial<IntegrationEntity>) {
    this.id = entity?.id;
  }
}
