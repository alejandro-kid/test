import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('StageContstageler (e2e)', () => {
  let app;
  let createStageId;

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

  it('should create a stage', async () => {
    const stage = {
      stage: 'Testing',
      description: 'An example stage for testing',
    };

    const { body } = await request(app.getHttpServer())
      .post('/stages')
      .send(stage)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.stage).toEqual(stage.stage);

    createStageId = body.id;
  });

  it('should get all stages', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/stages')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a stage by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/stages/${createStageId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.stage).toEqual('Testing');
  });

  it('should update a stage', async () => {
    const updateStage = {
      stage: 'TestStage' + createStageId,
      description: 'An updated stage for testing',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/stages/${createStageId}`)
      .send(updateStage)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.stage).toEqual(updateStage.stage);
  });

  it('should deleted a stage', async () => {
    await request(app.getHttpServer())
      .delete(`/stages/${createStageId}`)
      .expect(200);
  });
});
