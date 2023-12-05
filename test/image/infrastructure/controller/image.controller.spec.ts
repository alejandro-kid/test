import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from '../../../../src/image/infrastructure/controller/image.controller';
import { ImageService } from '../../../../src/image/application/image.service';

describe('ImageController', () => {
  let controller: ImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();

    controller = module.get<ImageController>(ImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
