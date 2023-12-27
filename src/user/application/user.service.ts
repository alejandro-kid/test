import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { IUserRepository } from '../domain/interface/user.interface';
import { User } from '../domain/user.entity';

@Injectable()
export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async create(usuario: CreateUserDto): Promise<User> {
    try {
      const Usuario: User = new User(usuario);

      return await this.userRepository.addUser(Usuario);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.getOneUser(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async update(id: number, changes: UpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.updateUser(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async remove(id: number): Promise<User> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
