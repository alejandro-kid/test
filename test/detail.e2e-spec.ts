import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DetailController (e2e)', () => {
  let app;
  let createDetailId;

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

  it('should create a detail', async () => {
    const detail = {
      product_id: 1,
      feature: 'TestFeature',
      value: 'TestPercent',
    };

    const { body } = await request(app.getHttpServer())
      .post('/details')
      .send(detail)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.feature).toEqual(detail.feature);

    createDetailId = body.id;
  });

  it('should get all details', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/details')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a detail by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/details/${createDetailId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.feature).toEqual('TestFeature');
  });

  it('should update a detail', async () => {
    const updateDetail = {
      product_id: 1,
      feature: 'UpdatedTest',
      value: 'TestPercentUdt',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/details/${createDetailId}`)
      .send(updateDetail)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.feature).toEqual(updateDetail.feature);
  });

  it('should deleted a detail', async () => {
    await request(app.getHttpServer())
      .delete(`/details/${createDetailId}`)
      .expect(200);
  });
});
