import { Test, TestingModule } from '@nestjs/testing';
import { StageService } from '../../../../src/stage/application/stage.service';
import { StageController } from '../../../../src/stage/infrastructure/controller/stage.controller';
import { Stage } from '../../../../src/stage/domain/stage.entity';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';

describe('StageController', () => {
  let controller: StageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StageController],
      providers: [
        PrismaService,
        {
          provide: StageService,
          useValue: Stage,
        },
      ],
    }).compile();

    controller = module.get<StageController>(StageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
