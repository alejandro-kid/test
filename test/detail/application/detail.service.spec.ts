import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from '../../../src/detail/application/detail.service';

describe('DetailService', () => {
  let service: DetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailService],
    }).compile();

    service = module.get<DetailService>(DetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
