import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterUserDTO } from 'src/data/contract/user.contract';
import { UserEntity } from 'src/data/entities/user.entity';
import { Repository } from 'typeorm';
import { Compare, encrypt } from '../utils';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async login(params: {email:string;password:string}) {
    const body = {...params}
    console.log(body.email)
    const userExist = await this.userRepository.findOne({
      where: { email: body.email },
    });

    if (!userExist)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      console.log(userExist)
    const checkPassword = await Compare(body.password, userExist.password);
    if (!checkPassword)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    userExist.password = undefined;
    console.log(userExist)

    const payload = {
      id: userExist.id,
      role: userExist.role,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_JWT,
    });
    const data = {
      token,
      user: userExist,
    };
    this.eventEmitter.emit('user.login', userExist);
    return data;
  }
  async register(params: RegisterUserDTO) {
    
      const userExist = await this.userRepository.findOne({
        where: { email: params.email },
      });
      if (userExist)
        throw new HttpException(
          'USER_REGISTER_PREVIOUSLY',
          HttpStatus.CONFLICT,
        );
      const passwordHash = await encrypt(params.password);
      params.password = passwordHash;
      const userData = await this.userRepository.save(params);
      console.log(userData);
      if (!userData)
        throw new HttpException('SOMETHING_WENT_WRONG', HttpStatus.BAD_REQUEST);
      return userData;}
  
}
