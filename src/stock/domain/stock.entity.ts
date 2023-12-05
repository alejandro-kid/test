import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateStockDto } from './dto/create-stock.dto';

export class Stock {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  constructor(stock: CreateStockDto) {
    this.id = stock.id;
    this.product_id = stock.product_id;
    this.quantity = stock.quantity;
  }
}
