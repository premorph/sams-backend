import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from 'src/data/data/data.module';
import { UserEntity } from 'src/data/entities/user.entity';
import { AuthController } from './auth/auth.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserController } from './user/user.controller';
import { BeneficiaryController } from './beneficiary.controller';
import { ServicesModule } from '../services/services.module';
@Module({
  imports: [
    DataModule,
    JwtModule.register({
      signOptions: { expiresIn: '4d' },
      secret: process.env.SECRET,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    EventEmitterModule.forRoot(),
    ServicesModule,
  ],
  controllers: [AuthController, UserController, BeneficiaryController],
})
export class ControllersModule {}
