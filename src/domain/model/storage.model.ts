import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterStoreDTO {
    @IsNotEmpty()
    @ApiProperty()
    filename: string;
    @IsNotEmpty()
    @ApiProperty()
    ref: number;
    @IsNotEmpty()
    @ApiProperty()
    user_id: any;
    @IsNotEmpty()
    @ApiProperty()
    type: string;}
export class UpdateStoreDTO {
    @ApiProperty()
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    @ApiProperty()
    filename: string;
    @IsNotEmpty()
    @ApiProperty()
    ref: number;
    @IsNotEmpty()
    @ApiProperty()
    user_id: any;
    @IsNotEmpty()
    @ApiProperty()
    type: string;}
export class StoreDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  @ApiProperty()
  filename: string;
  @IsNotEmpty()
  @ApiProperty()
  ref: number;
  @IsNotEmpty()
  @ApiProperty()
  user_id: any;
  @IsNotEmpty()
  @ApiProperty()
  type: string;
}
