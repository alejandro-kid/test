import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from '../../application/stock.service';
import { CreateStockDto } from '../../domain/dto/create-stock.dto';
import { UpdateStockDto } from '../../domain/dto/update-stock.dto';
import { StockRepositoryPrismaPsql } from '../stock.repository';
import { PrismaService } from '../../../prisma/application/prisma.service';

@Controller('stocks')
export class StockController {
  private readonly stockService: StockService;

  constructor(private readonly prisma: PrismaService) {
    const stockRepository = new StockRepositoryPrismaPsql(prisma);
    this.stockService = new StockService(stockRepository);
  }

  @Post()
  create(@Body() inventario: CreateStockDto) {
    return this.stockService.addStock(inventario);
  }

  @Get()
  findAll() {
    return this.stockService.getAllStocks();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stockService.getOneStock(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() changes: UpdateStockDto) {
    return this.stockService.updateStock(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stockService.deleteStock(+id);
  }
}
