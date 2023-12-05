import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStageDto {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  stage: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
