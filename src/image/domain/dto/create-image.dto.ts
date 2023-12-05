import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
export class CreateImageDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
