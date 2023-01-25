import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserModel, RegisterUserDTO } from '../../data/contract/user.contract';

@Module({})
export class EventsModule {
  @OnEvent('user.login')
  handleUserLoginEvent(user: UserModel) {
    console.log('login', user);
  }
  @OnEvent('user.create')
  handleUserCreateEvent(user: RegisterUserDTO) {
    console.log('register', user);
  }
}
