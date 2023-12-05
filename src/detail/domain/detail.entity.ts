import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { CreateDetailDto } from './dto/create-detail.dto';

export class Detail {
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

  constructor(detail: CreateDetailDto) {
    this.id = detail.id;
    this.product_id = detail.product_id;
    this.feature = detail.feature;
    this.value = detail.value;
  }
}
