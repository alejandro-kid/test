import { Injectable } from '@nestjs/common';
import { CreateStockDto } from '../domain/dto/create-stock.dto';
import { UpdateStockDto } from '../domain/dto/update-stock.dto';
import { IStockRepository } from '../domain/interface/stock.interface';
import { Stock } from '../domain/stock.entity';

@Injectable()
export class StockService {
  private detailRepository: IStockRepository;

  constructor(detailRepository: IStockRepository) {
    this.detailRepository = detailRepository;
  }

  public async addStock(inventario: CreateStockDto): Promise<Stock> {
    try {
      const Inventario: Stock = new Stock(inventario);

      return await this.detailRepository.addStock(Inventario);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllStocks(): Promise<Stock[]> {
    try {
      return await this.detailRepository.getAllStocks();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneStock(id: number): Promise<Stock> {
    try {
      return await this.detailRepository.getOneStock(id);
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
      return await this.detailRepository.updateStock(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async deleteStock(id: number): Promise<Stock> {
    try {
      return await this.detailRepository.deleteStock(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
