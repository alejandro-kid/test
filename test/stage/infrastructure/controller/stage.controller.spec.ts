import { Test, TestingModule } from '@nestjs/testing';
import { StageService } from '../../../../src/stage/application/stage.service';
import { StageController } from '../../../../src/stage/infrastructure/controller/stage.controller';

describe('StageController', () => {
  let controller: StageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageController],
      providers: [StageService],
    }).compile();

    controller = module.get<StageController>(StageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
