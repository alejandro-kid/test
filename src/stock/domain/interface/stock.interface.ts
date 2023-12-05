import { UpdateStockDto } from '../dto/update-stock.dto';
import { Stock } from '../stock.entity';

export interface IStockRepository {
  addStock(detail: Stock): Promise<Stock>;
  getAllStocks(): Promise<Stock[]>;
  getOneStock(id: number): Promise<Stock>;
  updateStock(id: number, changes: UpdateStockDto): Promise<Stock>;
  deleteStock(id: number): Promise<Stock>;
}
