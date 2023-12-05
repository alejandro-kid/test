import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProductDto } from './dto/create-product.dto';
import Decimal from 'decimal.js';

export class Product {
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

  constructor(producto: CreateProductDto) {
    this.product = producto.product;
    this.price = new Decimal(producto.price);
    this.description = producto.description;
  }
}
