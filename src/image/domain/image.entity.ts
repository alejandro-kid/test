import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { CreateImageDto } from './dto/create-image.dto';
export class Image {
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

  constructor(image: CreateImageDto) {
    this.id = image.id;
    this.product_id = image.product_id;
    this.image = image.image;
    this.description = image.description;
  }
}
