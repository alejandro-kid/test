import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';
import { RolService } from '../../../../src/rol/application/rol.service';
import { Rol } from '../../../../src/rol/domain/rol.entity';
import { RolController } from '../../../../src/rol/infrastructure/controller/rol.controller';

describe('RolController', () => {
  let controller: RolController;
  let service: RolService;

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

    service = module.get<RolService>(RolService);
    controller = module.get<RolController>(RolController);
  });

  const result = [
    {
      id: 3,
      rol: 'Administrator',
      description:
        'Rol del usuario que se encarca de la administración y mantenimiento de los servicios de la app',
    },
    {
      id: 1,
      rol: 'Customer',
      description: 'Rol del usuario que solo realiza compras en la app',
    },
    {
      id: 2,
      rol: 'Store',
      description:
        'Rol del usuario que provee productos para su venta y que también puede realizar compras',
    },
  ];

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAllRol', () => {
    it('should return an array or roles', async () => {
      // jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toStrictEqual(result);
    });
  });

  describe('getOneRol', () => {
    it('should return a rol by id', async () => {
      // jest.spyOn(service, 'findOne').mockImplementation(async () => Rol);

      expect(await controller.findOne(result[1].id)).toStrictEqual(result[1]);
    });
  });
});
