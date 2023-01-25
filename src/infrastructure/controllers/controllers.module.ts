import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from 'src/data/data/data.module';
import { UserEntity } from 'src/data/entities/user.entity';
import { AuthService } from '../services/auth.service';
import UserService from '../services/user.service';
import { AuthController } from './auth/auth.controller';
import { Jwtstrategy } from './auth/strategy/jwtstrategy.service';
import { UserController } from './user.controller';

@Module({
  imports: [DataModule,TypeOrmModule.forFeature([UserEntity]),
JwtModule.registerAsync({
  useFactory:()=>{
    return{
      signOptions:{expiresIn:'4d'},
      secret:process.env.SECRET    
    }
    }
})],
controllers:[AuthController, UserController],
providers:[AuthService,UserService,Jwtstrategy]
})
export class ControllersModule {}
