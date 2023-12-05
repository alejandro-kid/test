import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from '../../../../src/stock/infrastructure/controller/stock.controller';
import { StockService } from '../../../../src/stock/application/stock.service';

describe('StockController', () => {
  let controller: StockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
