import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entities/user.entity';
import { AuthService } from './auth.service';
import UserService from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),

],
  providers: [AuthService,UserService],
})
export class ServicesModule {}
