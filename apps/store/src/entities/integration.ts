import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    onDelete: 'CASCADE',
  })
  store: StoreEntity;

  constructor(entity?: Partial<IntegrationEntity>) {
    this.id = entity?.id;
  }
}
