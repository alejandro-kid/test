import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../../src/product/application/product.service';
import { Product } from '../../../src/product/domain/product.entity';

describe('ProductService', () => {
  let productService: ProductService;
  // let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: Product,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should retrieve a product by ID', async () => {
    const retrievedProduct = await productService.getOneProduct(2);

    expect(retrievedProduct).toBeDefined();
    expect(retrievedProduct.product).toEqual({});
  });
});
