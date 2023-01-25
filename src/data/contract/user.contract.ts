import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator'
export class UserModel {
  id?: string;
  @MinLength(5)
  @MaxLength(20)
  fullname: string;
  @IsEmail()
  email: string;
  @MinLength(11)
  @MaxLength(11)
  phoneNum: string;
  profilePicture: string;
  
  activationStatus: activationState | any;
  role: 'master' | 'import' | 'bought' | 'store';
}
export class GetAllDTO{
  role:'master' | 'import' | 'bought' | 'store'
}
interface activationState {
  label: string;
  value: string;
}
export class LoginDTO{
  @IsEmail()
  email:string;
  @MinLength(5)
  @MinLength(8)
  password:string;
}
export class UpdateUserDTO{
  @IsNotEmpty()
  id: string;
  @MinLength(5)
  @MaxLength(20)
  fullname: string;
  @IsEmail()
  email: string;
  @MinLength(11)
  @MaxLength(11)
  phoneNum: string;
  profilePicture: string;  
  activationStatus: activationState | any;
  role: 'master' | 'import' | 'bought' | 'store'; 
}

export class RegisterUserDTO{
  @MinLength(5)
  @MaxLength(20)
  fullname: string;
  @IsEmail()
  email: string;
  @MinLength(11)
  @MaxLength(11)
  phoneNum: string;
  @MinLength(5)
  @MaxLength(8)
  password:string;
  profilePicture: string;  
  activationStatus: activationState | any;
  role: 'master' | 'import' | 'bought' | 'store';
}