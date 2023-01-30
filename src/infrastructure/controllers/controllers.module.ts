import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data/data.module';
import { AuthController } from './auth/auth.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserController } from './user/user.controller';
import { BeneficiaryController } from './beneficiary.controller';
import { ServicesModule } from '../services/services.module';
import { BankController } from './bank/bank.controller';
@Module({
  imports: [DataModule, EventEmitterModule.forRoot(), ServicesModule],
  controllers: [
    AuthController,
    UserController,
    BeneficiaryController,
    BankController,
  ],
})
export class ControllersModule {}
