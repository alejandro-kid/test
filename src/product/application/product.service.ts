import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../domain/interface/product.interface';
import { Product } from '../domain/product.entity';
import { CreateProductDto } from '../domain/dto/create-product.dto';
import { UpdateProductDto } from '../domain/dto/update-product.dto';

@Injectable()
export class ProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async addProduct(producto: CreateProductDto): Promise<Product> {
    try {
      const Producto: Product = new Product(producto);

      return await this.productRepository.addProduct(Producto);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.getAllProducts();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneProduct(id: number): Promise<Product> {
    try {
      return await this.productRepository.getOneProduct(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async updateProdcut(
    id: number,
    changes: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productRepository.updateProduct(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async deleteProduct(id: number): Promise<Product> {
    try {
      return await this.productRepository.deleteProduct(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
