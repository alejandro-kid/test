import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService],
})
export class ProductModule {}
