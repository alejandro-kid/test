import { Stock } from '../domain/stock.entity';
import { IStockRepository } from '../domain/interface/stock.interface';
import { UpdateStockDto } from '../domain/dto/update-stock.dto';
import { PrismaService } from '../../prisma/application/prisma.service';

export class StockRepositoryPrismaPsql implements IStockRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addStock(detalle: Stock): Promise<Stock> {
    try {
      return await this.prisma.stock.create({
        data: detalle,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllStocks(): Promise<Stock[]> {
    try {
      return await this.prisma.stock.findMany({
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

  public async getOneStock(id: number): Promise<Stock> {
    try {
      const founded = await this.prisma.stock.findUnique({
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

  public async updateStock(
    id: number,
    changes: UpdateStockDto,
  ): Promise<Stock> {
    try {
      const founded = await this.getOneStock(id);

      const updated = await this.prisma.stock.update({
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

  public async deleteStock(id: number): Promise<Stock> {
    try {
      const founded = await this.getOneStock(id);

      return await this.prisma.stock.delete({
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
