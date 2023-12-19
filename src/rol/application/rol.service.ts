import { Injectable } from '@nestjs/common';
import { CreateRolDto } from '../domain/dto/create-rol.dto';
import { UpdateRolDto } from '../domain/dto/update-rol.dto';
import { IRolRepository } from '../domain/interface/rol.interface';
import { Rol } from '../domain/rol.entity';

@Injectable()
export class RolService {
  private rolRepository: IRolRepository;

  constructor(rolReository: IRolRepository) {
    this.rolRepository = rolReository;
  }

  public async create(rol: CreateRolDto): Promise<Rol> {
    try {
      const Roll: Rol = new Rol(rol);
      return await this.rolRepository.addRol(Roll);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async findAll(): Promise<Rol[]> {
    try {
      return await this.rolRepository.getAllRol();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async findOne(id: number): Promise<Rol> {
    try {
      return await this.rolRepository.getOneRol(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async update(id: number, changes: UpdateRolDto): Promise<Rol> {
    try {
      return await this.rolRepository.updateRol(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async remove(id: number): Promise<Rol> {
    try {
      return await this.rolRepository.deleteRol(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
