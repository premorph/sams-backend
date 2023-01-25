import { UserModel } from 'src/data/contract/user.contract';

export interface AuthContract {
  login(params: { email: string; passord: string }): UserModel;
}
