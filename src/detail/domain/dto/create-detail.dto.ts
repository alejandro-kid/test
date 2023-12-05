import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDetailDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  feature: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}
