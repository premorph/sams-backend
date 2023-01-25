/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/data/contract/user.contract';
import { UserEntity } from 'src/data/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT,
    });
  }
  async validate(payload: UserModel) {
    const user = this.userRepository.findOne({ where: { id: payload.id } });
    return user;
  }
}
