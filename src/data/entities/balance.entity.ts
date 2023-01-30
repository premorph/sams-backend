import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { Bank } from './bank.entity';
import { Store } from './store.entity';
import { UserEntity } from './user.entity';
@Entity()
export class BalanceEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date?: string;
  @OneToOne(() => Bank, (bank) => bank.id)
  bankFrom?: string;
  @OneToOne(() => Store, (store) => store.id)
  company?: Store;
  @OneToOne(() => Beneficiary, (beneficiary) => beneficiary.id)
  beneficiary?: Beneficiary;
  @OneToOne(() => Bank, (bank) => bank.id)
  bankTo?: Bank;
  @Column()
  amount?: number;
  @Column()
  rate?: number;
  @Column()
  bs?: number;
  @Column()
  boughtFrom?: string;
  @Column()
  datePay?: string;
  @Column({ default: 'Pendiente' })
  status: 'Pendiente' | 'Entregado';
  @Column()
  ref?: string;
  @Column()
  note?: string;
  @Column()
  obsvervation?: string;
  @OneToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;
}
