import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserContuserler (e2e)', () => {
  let app;
  let createUserId;

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

  it('should create a user', async () => {
    const user = {
      email: 'Testing',
      passwd: 'Testing',
      active: true,
      rol_id: 1,
    };

    const { body } = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.email).toEqual(user.email);

    createUserId = body.id;
  });

  it('should get all users', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a user by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/users/${createUserId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.email).toEqual('Testing');
  });

  it('should update a user', async () => {
    const updateUser = {
      email: 'Testing',
      passwd: 'Testing',
      active: true,
      rol_id: 1,
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/users/${createUserId}`)
      .send(updateUser)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.email).toEqual(updateUser.email);
  });

  it('should deleted a user', async () => {
    await request(app.getHttpServer())
      .delete(`/users/${createUserId}`)
      .expect(200);
  });
});
