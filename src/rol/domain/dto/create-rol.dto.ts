import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRolDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsString()
  description: string;
}
