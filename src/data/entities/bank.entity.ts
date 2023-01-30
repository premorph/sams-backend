import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { UserEntity } from './user.entity';
@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  accountNumber: number;
  @Column()
  isActive: boolean;
  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.bankId)
  companyId: Beneficiary;
  @ManyToOne(() => UserEntity, (user) => user.id)
  user_id: UserEntity;
}
