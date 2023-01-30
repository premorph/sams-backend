import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterBankDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  accountNumber: number;
  @ApiProperty()
  @IsNotEmpty()
  companyId: any;
  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
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
  accountNumber: number;
  @ApiProperty()
  @IsNotEmpty()
  companyId: any;
  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
  @ApiProperty()
  @IsNotEmpty()
  user_id: any;
}
