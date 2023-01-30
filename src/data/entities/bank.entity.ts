import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column({unique:true})
  accountNumber: number;
  @Column()
  isActive: boolean;
  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.bankId)
  companyId: Beneficiary;
}
