import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO, RegisterUserDTO, UserModel } from 'src/data/contract/user.contract';
import { UserEntity } from 'src/data/entities/user.entity';
import { Repository } from 'typeorm';
import { Compare, encrypt } from '../utils';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService, 
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  login(params: LoginDTO) {
    const userExist: any = this.userRepository.findOne({
      where: { email: params.email },
    });
    if(!userExist) throw new HttpException('USER_NOT_FOUND',HttpStatus.NOT_FOUND)
    const checkPassword = Compare(params.password, userExist.password);
    if (!checkPassword) throw new HttpException('USER_NOT_FOUND',HttpStatus.BAD_REQUEST)
      const userFlag=  userExist.toObject()
      delete userFlag.password
      const payload={
        id:userFlag.id,
        role:userFlag.role
      }
      const token = this.jwtService.sign(payload)
      const data ={
        token,
        user:userFlag
      }
    return data;
  }
  async register(params:RegisterUserDTO){
    try {
      const userExist = this.userRepository.findOne({where:{email:params.email}})
      if(userExist) throw new HttpException('USER_REGISTER_PREVIOUSLY',HttpStatus.CONFLICT)
      const  {
        password, ...user
      } = params
      const userParse={
        user,password: await encrypt(password)
      }
      const userData= this.userRepository.create(userParse)
      if(!userData) throw new HttpException('SOMETHING_WENT_WRONG',HttpStatus.BAD_REQUEST)
      return userData;
    } catch (error) {
      throw new HttpException('SOMETHING_WENT_WRONG',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
