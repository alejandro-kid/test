import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../product.entity';

export interface IProductRepository {
  addProduct(product: Product): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getOneProduct(id: number): Promise<Product>;
  updateProduct(id: number, changes: UpdateProductDto): Promise<Product>;
  deleteProduct(id: number): Promise<Product>;
}
