import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from '../../../../src/image/infrastructure/controller/image.controller';
import { ImageService } from '../../../../src/image/application/image.service';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';
import { Image } from '../../../../src/image/domain/image.entity';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        PrismaService,
        {
          provide: ImageService,
          useValue: Image,
        },
      ],
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
