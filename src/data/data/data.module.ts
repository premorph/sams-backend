import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BalanceEntity } from '../entities/balance.entity';
import { UserEntity } from '../entities/user.entity';
import { Bank } from '../entities/bank.entity';
import { Beneficiary } from '../entities/beneficiary.entity';
export type Type = 'mssql' | 'mysql' | 'oracle' | 'mariadb';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'HAn.1208',
      database: 'sams',
      entities: [BalanceEntity, UserEntity, Bank, Beneficiary],
      synchronize: true,
      //extra: { trustServerCertificate: true },
    }),
  ],
})
export class DataModule {
  constructor(private dataSource: DataSource) {}
}
