import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';

export class PaymentMethod {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(pmethod: CreatePaymentMethodDto) {
    this.id = pmethod.id;
    this.method = pmethod.method;
    this.description = pmethod.description;
  }
}
