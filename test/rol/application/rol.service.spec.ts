import { Test, TestingModule } from '@nestjs/testing';
import { RolService } from '../../../src/rol/application/rol.service';
import { Rol } from '../../../src/rol/domain/rol.entity';

describe('RolService', () => {
  let service: RolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RolService,
          useValue: Rol,
        },
      ],
    }).compile();

    service = module.get<RolService>(RolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
