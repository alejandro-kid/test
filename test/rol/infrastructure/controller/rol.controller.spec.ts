import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';
import { RolService } from '../../../../src/rol/application/rol.service';
import { Rol } from '../../../../src/rol/domain/rol.entity';
import { RolController } from '../../../../src/rol/infrastructure/controller/rol.controller';

describe('RolController', () => {
  let controller: RolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolController],
      providers: [
        PrismaService,
        {
          provide: RolService,
          useValue: Rol,
        },
      ],
    }).compile();

    controller = module.get<RolController>(RolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
