import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entities/user.entity';
import { AuthService } from './auth.service';
import UserService from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { Bank } from '../../data/entities/bank.entity';
import { Beneficiary } from '../../data/entities/beneficiary.entity';
import { BeneficiaryService } from './beneficiary.service';
import { BankService } from './bank.service';

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '4d' },
      secret: process.env.SECRET,
    }),
    TypeOrmModule.forFeature([UserEntity, Bank, Beneficiary]),
  ],
  providers: [AuthService, UserService, BeneficiaryService, BankService],
  exports: [AuthService, UserService, BeneficiaryService, BankService],
})
export class ServicesModule {}
