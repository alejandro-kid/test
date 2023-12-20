import { INestApplication } from '@nestjs/common';
import { RolService } from '../../src/rol/application/rol.service';
import { Test } from '@nestjs/testing';
import { RolModule } from '../../src/rol/infrastructure/rol.module';
import * as request from 'supertest';
// import { Rol } from '../../src/rol/domain/rol.entity';

describe('Rol', () => {
  let app: INestApplication;

  const rol = {
    id: 4,
    rol: 'Tester',
    description: 'Testing role',
  };

  const rolService = {
    findAll: () => ['test'],
    findOne: (id) => ['test'],
    create: (rol) => ['test'],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RolModule],
    })
      .overrideProvider(RolService)
      .useValue(rolService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET roles`, () => {
    return request(app.getHttpServer()).get('/roles').expect(200).expect({
      data: rolService.findAll(),
    });
  });

  it(`GET rol`, (id) => {
    return request(app.getHttpServer())
      .get('/roles/id')
      .expect(200)
      .expect({
        data: rolService.findOne(id),
      });
  });

  it(`POS rol`, (rol) => {
    return request(app.getHttpServer())
      .post('/roles')
      .expect(201)
      .expect({
        data: rolService.create(rol),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
