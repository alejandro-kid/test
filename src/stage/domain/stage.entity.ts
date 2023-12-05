import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateStageDto } from './dto/create-stage.dto';

export class Stage {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  stage: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(stage: CreateStageDto) {
    this.id = stage.id;
    this.stage = stage.stage;
    this.description = stage.description;
  }
}
