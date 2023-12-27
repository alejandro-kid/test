import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

export class User {
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  passwd: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  rol_id: number;

  constructor(user: CreateUserDto) {
    this.id = user.id;
    this.email = user.email;
    this.passwd = user.passwd;
    this.active = user.active;
    this.rol_id = user.rol_id;
  }
}
