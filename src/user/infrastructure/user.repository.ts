import { IUserRepository } from '../domain/interface/user.interface';
import { PrismaService } from '../../prisma/application/prisma.service';
import { User } from '../domain/user.entity';
import { UpdateUserDto } from '../domain/dto/update-user.dto';

export class UserRepositoryPrismaPsql implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addUser(usuario: User): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: usuario,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        orderBy: {
          email: 'asc',
        },
        include: {
          roles: {
            select: {
              rol: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneUser(id: number): Promise<User> {
    try {
      const founded = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          roles: {
            select: {
              rol: true,
            },
          },
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

  public async updateUser(id: number, changes: UpdateUserDto): Promise<User> {
    try {
      const founded = await this.getOneUser(id);

      const updated = await this.prisma.user.update({
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

  public async deleteUser(id: number): Promise<User> {
    try {
      const founded = await this.getOneUser(id);

      return await this.prisma.user.delete({
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
