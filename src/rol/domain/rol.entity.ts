import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateRolDto } from './dto/create-rol.dto';

export class Rol {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  rol: string;

  @IsString()
  description: string;

  constructor(rol: CreateRolDto) {
    this.id = rol.id;
    this.rol = rol.rol;
    this.description = rol.description;
  }
}
