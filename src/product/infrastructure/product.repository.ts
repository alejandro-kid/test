import { IProductRepository } from '../domain/interface/product.interface';
import { Product } from '../domain/product.entity';
import { PrismaService } from '../../prisma/application/prisma.service';

export class ProductRepositoryPrismaPsql implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addProduct(producto: Product): Promise<Product> {
    try {
      return await this.prisma.product.create({
        data: producto,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany({
        include: {
          details: {
            select: {
              feature: true,
              value: true,
            },
            orderBy: {
              feature: 'asc',
            },
          },
          images: {
            select: {
              image: true,
              description: true,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneProduct(id: number): Promise<Product> {
    try {
      const founded = await this.prisma.product.findUnique({
        include: {
          details: {
            select: {
              feature: true,
              value: true,
            },
            orderBy: {
              feature: 'asc',
            },
          },
          images: {
            select: {
              image: true,
              description: true,
            },
          },
        },
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

  public async updateProduct(id: number, changes: any): Promise<Product> {
    try {
      const founded = await this.getOneProduct(id);

      const updated = await this.prisma.product.update({
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

  public async deleteProduct(id: number): Promise<Product> {
    try {
      const founded = await this.getOneProduct(id);

      return await this.prisma.product.delete({
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
