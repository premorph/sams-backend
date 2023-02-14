import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterBankDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  accountNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  company_id: any;
  @ApiProperty()
  @IsNotEmpty()
  isActive: string;
  @ApiProperty()
  user_id: any;
}
export class UpdateBankDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  accountNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  company_id: any;
  @ApiProperty()
  @IsNotEmpty()
  isActive: string;
  @ApiProperty()
  @IsNotEmpty()
  user_id: any;
}
