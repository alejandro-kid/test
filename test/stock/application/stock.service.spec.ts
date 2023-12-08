import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from '../../../src/stock/application/stock.service';
import { Stock } from '../../../src/stock/domain/stock.entity';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StockService,
          useValue: Stock,
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
