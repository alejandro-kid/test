import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from '../../application/product.service';
import { ProductRepositoryPrismaPsql } from '../product.repository';
import { PrismaService } from '../../../prisma/application/prisma.service';
import { CreateProductDto } from '../../domain/dto/create-product.dto';
import { Product } from '../../domain/product.entity';
import { UpdateProductDto } from '../../domain/dto/update-product.dto';

@Controller('products')
export class ProductController {
  private readonly productService: ProductService;

  constructor(private readonly prisma: PrismaService) {
    const productRepository = new ProductRepositoryPrismaPsql(prisma);
    this.productService = new ProductService(productRepository);
  }

  @Post()
  async create(
    @Body()
    producto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.addProduct(producto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.getOneProduct(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() changes: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProdcut(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Product> {
    return this.productService.deleteProduct(+id);
  }
}
