import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import Decimal from 'decimal.js';

export class CreateProductDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  price: Decimal;

  @IsNotEmpty()
  @IsString()
  description: string;
}
