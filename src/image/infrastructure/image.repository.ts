import { IImageRepository } from '../domain/interface/image.interface';
import { Image } from '../domain/image.entity';
import { UpdateImageDto } from '../domain/dto/update-image.dto';
import { PrismaService } from '../../prisma/application/prisma.service';

export class ImageRepositoryPrismaPsql implements IImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addImage(imagen: Image): Promise<Image> {
    try {
      return await this.prisma.image.create({
        data: imagen,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllImages(): Promise<Image[]> {
    try {
      return await this.prisma.image.findMany({
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

  public async getOneImage(id: number): Promise<Image> {
    try {
      const founded = await this.prisma.image.findUnique({
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

  public async updateImage(
    id: number,
    changes: UpdateImageDto,
  ): Promise<Image> {
    try {
      const founded = await this.getOneImage(id);

      const updated = await this.prisma.image.update({
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

  public async deleteImage(id: number): Promise<Image> {
    try {
      const founded = await this.getOneImage(id);

      return await this.prisma.image.delete({
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
