import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
