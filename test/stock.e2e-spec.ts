import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('StockController (e2e)', () => {
  let app;
  let createStockId;

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

  it('should create a stock', async () => {
    const stock = {
      product_id: 1,
      quantity: 85,
    };

    const { body } = await request(app.getHttpServer())
      .post('/stocks')
      .send(stock)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.quantity).toEqual(stock.quantity);

    createStockId = body.id;
  });

  it('should get all stocks', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/stocks')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a stock by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/stocks/${createStockId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.quantity).toEqual(85);
  });

  it('should update a stock', async () => {
    const updateStock = {
      product_id: 1,
      quantity: 100,
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/stocks/${createStockId}`)
      .send(updateStock)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.quantity).toEqual(updateStock.quantity);
  });

  it('should deleted a stock', async () => {
    await request(app.getHttpServer())
      .delete(`/stocks/${createStockId}`)
      .expect(200);
  });
});
