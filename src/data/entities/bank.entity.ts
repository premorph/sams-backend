import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Beneficiary } from './beneficiary.entity';
import { UserEntity } from './user.entity';
@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  accountNumber: string;
  @Column()
  isActive: string;
  @ManyToOne(() => Beneficiary, (beneficiary) => beneficiary.id)
  @JoinColumn()
  company_id: Beneficiary;
  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user_id: UserEntity;
  @CreateDateColumn()
  created!: Date;
  @UpdateDateColumn()
  updated!: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}
