import { Module } from '@nestjs/common';
import { StockController } from './controller/stock.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [StockController],
  providers: [PrismaService],
})
export class StockModule {}
