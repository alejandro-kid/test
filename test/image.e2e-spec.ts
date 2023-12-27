import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ImageController (e2e)', () => {
  let app;
  let createImageId;

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

  it('should create a image', async () => {
    const image = {
      product_id: 1,
      image: 'TestImage',
      description: 'TestPercent',
    };

    const { body } = await request(app.getHttpServer())
      .post('/images')
      .send(image)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.image).toEqual(image.image);

    createImageId = body.id;
  });

  it('should get all images', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/images')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a image by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/images/${createImageId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.image).toEqual('TestImage');
  });

  it('should update a image', async () => {
    const updateImage = {
      product_id: 1,
      image: 'UpdatedTest',
      description: 'TestPercentUdt',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/images/${createImageId}`)
      .send(updateImage)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.image).toEqual(updateImage.image);
  });

  it('should deleted a image', async () => {
    await request(app.getHttpServer())
      .delete(`/images/${createImageId}`)
      .expect(200);
  });
});
