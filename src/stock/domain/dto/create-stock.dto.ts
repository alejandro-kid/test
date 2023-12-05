import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
