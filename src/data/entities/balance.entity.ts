import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { Bank } from './bank.entity';
import { Store } from './store.entity';
import { UserEntity } from './user.entity';
@Entity()
export class BalanceEntity {  
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:true})
  date?: string;
  @OneToOne(() => Bank, (bank) => bank.id)
  bankFrom?: string;
  @OneToOne(() => Beneficiary, (beneficiary) => beneficiary.id)
  company?: Store;
  @OneToOne(() => Beneficiary, (beneficiary) => beneficiary.id)
  beneficiary?: Beneficiary;
  @OneToOne(() => Bank, (bank) => bank.id)
  bankTo?: Bank;
  @Column({nullable:true})
  amount?: number;
  @Column({nullable:true})
  rate?: number;
  @Column({nullable:true})
  bs?: number;
  @Column({nullable:true})
  boughtFrom?: string;
  @Column({nullable:true})
  datePay?: string;
  @Column({nullable:true})
  status: string;
  @Column({nullable:true})
  ref?: string;
  @Column({nullable:true})
  note?: string;
  @Column({nullable:true})
  obsvervation?: string;
  @OneToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;
}
