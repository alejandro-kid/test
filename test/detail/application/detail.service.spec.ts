import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from '../../../src/detail/application/detail.service';
import { Detail } from '../../../src/detail/domain/detail.entity';

describe('DetailService', () => {
  let service: DetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DetailService,
          useValue: Detail,
        },
      ],
    }).compile();

    service = module.get<DetailService>(DetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
