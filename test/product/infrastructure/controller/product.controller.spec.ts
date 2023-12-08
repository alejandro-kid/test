import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../../../src/product/infrastructure/controller/product.controller';
import { ProductService } from '../../../../src/product/application/product.service';
import { Product } from '../../../../src/product/domain/product.entity';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        PrismaService,
        {
          provide: ProductService,
          useValue: Product,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
