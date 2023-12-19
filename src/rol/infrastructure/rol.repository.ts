import { IRolRepository } from '../domain/interface/rol.interface';
import { PrismaService } from '../../prisma/application/prisma.service';
import { Rol } from '../domain/rol.entity';
import { UpdateRolDto } from '../domain/dto/update-rol.dto';

export class RolRepositoryPrismaPsql implements IRolRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addRol(rol: Rol): Promise<Rol> {
    try {
      return await this.prisma.rol.create({
        data: rol,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllRol(): Promise<Rol[]> {
    try {
      return await this.prisma.rol.findMany({
        orderBy: {
          rol: 'asc',
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneRol(id: number): Promise<Rol> {
    try {
      const founded = await this.prisma.rol.findUnique({
        where: {
          id: id,
        },
      });

      if (!founded.id) {
        throw new Error(`No se encontró el registro`);
      } else return founded;
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async updateRol(id: number, changes: UpdateRolDto): Promise<Rol> {
    try {
      const founded = await this.getOneRol(id);

      const updated = await this.prisma.rol.update({
        where: {
          id: founded.id,
        },
        data: changes,
      });

      if (!updated.id) {
        throw new Error(`Error al intentar actualizar el registro`);
      }
      return updated;
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async deleteRol(id: number): Promise<Rol> {
    try {
      const founded = await this.getOneRol(id);

      return await this.prisma.rol.delete({
        where: {
          id: founded.id,
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
