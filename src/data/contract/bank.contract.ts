import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty, Length } from 'class-validator';

export class RegisterBankDTO {
  name: string;
  accountNumber: number;
  companyId: number;
  isActive: boolean;
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
}
