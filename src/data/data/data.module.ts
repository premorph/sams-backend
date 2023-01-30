import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BalanceEntity } from '../entities/balance.entity';
import { UserEntity } from '../entities/user.entity';
import { Bank } from '../entities/bank.entity';
import { Beneficiary } from '../entities/beneficiary.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1443,
      username: 'node',
      password: 'HAn.1208',
      database: 'sams',
      entities: [BalanceEntity, UserEntity, Bank, Beneficiary],
      synchronize: true,
      extra: { trustServerCertificate: true },
    }),
  ],
})
export class DataModule {
  constructor(private dataSource: DataSource) {}
}
