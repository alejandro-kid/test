import { IDetailRepository } from '../domain/interface/detail.interface';
import { Detail } from '../domain/detail.entity';
import { UpdateDetailDto } from '../domain/dto/update-detail.dto';
import { PrismaService } from '../../prisma/application/prisma.service';

export class DetailRepositoryPrismaPsql implements IDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addDetail(detalle: Detail): Promise<Detail> {
    try {
      return await this.prisma.detail.create({
        data: detalle,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllDetails(): Promise<Detail[]> {
    try {
      return await this.prisma.detail.findMany({
        orderBy: {
          product_id: 'asc',
        },
        include: {
          products: {
            select: {
              product: true,
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

  public async getOneDetail(id: number): Promise<Detail> {
    try {
      const founded = await this.prisma.detail.findUnique({
        where: {
          id: id,
        },
        include: {
          products: {
            select: {
              product: true,
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

  public async updateDetail(
    id: number,
    changes: UpdateDetailDto,
  ): Promise<Detail> {
    try {
      const founded = await this.getOneDetail(id);

      const updated = await this.prisma.detail.update({
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

  public async deleteDetail(id: number): Promise<Detail> {
    try {
      const founded = await this.getOneDetail(id);

      return await this.prisma.detail.delete({
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
