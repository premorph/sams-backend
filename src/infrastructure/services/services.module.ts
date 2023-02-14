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
import { Jwtstrategy } from '../controllers/auth/strategy/jwtstrategy.service';
import { StorageService } from './storage/storage.service';
import { Storage } from 'src/data/entities/storage.entity';
import { BalanceEntity } from 'src/data/entities';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.SECRET,
        };
      },
    }),
    TypeOrmModule.forFeature([UserEntity, Bank, Beneficiary,Storage,BalanceEntity]),
  ],
  providers: [
    AuthService,
    UserService,
    BeneficiaryService,
    Jwtstrategy,
    BankService,
    StorageService,BalanceService
  ],
  exports: [
    AuthService,
    Jwtstrategy,
    UserService,
    BeneficiaryService,
    BankService,
    StorageService,BalanceService
  ],
})
export class ServicesModule {}
