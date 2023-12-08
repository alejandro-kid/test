import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from '../../../src/image/application/image.service';
import { Image } from '../../../src/image/domain/image.entity';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ImageService,
          useValue: Image,
        },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
