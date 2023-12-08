import { Test, TestingModule } from '@nestjs/testing';
import { StageService } from '../../../src/stage/application/stage.service';
import { Stage } from '../../../src/stage/domain/stage.entity';

describe('StageService', () => {
  let service: StageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StageService,
          useValue: Stage,
        },
      ],
    }).compile();

    service = module.get<StageService>(StageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
