import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class UserModel {
  id?: number;
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
export class GetAllDTO {
  role: 'master' | 'import' | 'bought' | 'store';
}
interface activationState {
  label: string;
  value: string;
}
export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(5)
  @MaxLength(8)
  @IsNotEmpty()
  password: string;
}
export class UpdateUserDTO {
  id:number
  @ApiProperty()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(11)
  @MaxLength(11)
  @IsNotEmpty()
  phoneNum: string;
  @ApiProperty()
  profilePicture: string;
  @ApiProperty()
  activationStatus: activationState | any;
  @ApiProperty()
  role: 'master' | 'import' | 'bought' | 'store';
}

export class RegisterUserDTO {
  @ApiProperty()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @MinLength(11)
  @MaxLength(11)
  @IsNotEmpty()
  phoneNum: string;
  @ApiProperty()
  @MinLength(5)
  @MaxLength(8)
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  profilePicture: string;
  @ApiProperty()
  isActive: string;
  @ApiProperty()
  role: string;
}
