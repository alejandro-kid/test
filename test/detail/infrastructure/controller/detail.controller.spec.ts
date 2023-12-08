import { Test, TestingModule } from '@nestjs/testing';
import { DetailController } from '../../../../src/detail/infrastructure/controller/detail.controller';
import { DetailService } from '../../../../src/detail/application/detail.service';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';
import { Detail } from '../../../../src/detail/domain/detail.entity';

describe('DetailController', () => {
  let controller: DetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailController],
      providers: [
        PrismaService,
        {
          provide: DetailService,
          useValue: Detail,
        },
      ],
    }).compile();

    controller = module.get<DetailController>(DetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
