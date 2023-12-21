import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('RolController (e2e)', () => {
  let app;
  let createRolId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a rol', async () => {
    const rol = {
      rol: 'Testing',
      description: 'An example rol for testing',
    };

    const { body } = await request(app.getHttpServer())
      .post('/roles')
      .send(rol)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.rol).toEqual(rol.rol);

    createRolId = body.id;
  });

  it('should get all roles', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/roles')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a rol by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/roles/${createRolId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.rol).toEqual('Testing');
  });

  it('should update a rol', async () => {
    const updateRol = {
      rol: 'UpdatedTest',
      description: 'An updated rol for testing',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/roles/${createRolId}`)
      .send(updateRol)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.rol).toEqual(updateRol.rol);
  });

  it('should deleted a rol', async () => {
    await request(app.getHttpServer())
      .delete(`/roles/${createRolId}`)
      .expect(200);
  });
});
