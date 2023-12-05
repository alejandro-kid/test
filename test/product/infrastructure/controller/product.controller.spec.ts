import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../../../src/product/infrastructure/controller/product.controller';
import { ProductService } from '../../../../src/product/application/product.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
