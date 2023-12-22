import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ProductContproductler (e2e)', () => {
  let app;
  let createProductId;

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

  it('should create a product', async () => {
    const product = {
      product: 'Testing',
      price: 32.5,
      description: 'An example product for testing',
    };

    const { body } = await request(app.getHttpServer())
      .post('/products')
      .send(product)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.product).toEqual(product.product);

    createProductId = body.id;
  });

  it('should get all products', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a product by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/products/${createProductId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.product).toEqual('Testing');
  });

  it('should update a product', async () => {
    const updateProduct = {
      product: 'Product' + createProductId,
      price: 50.2,
      description: 'An updated product for testing',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/products/${createProductId}`)
      .send(updateProduct)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.product).toEqual(updateProduct.product);
  });

  it('should deleted a product', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${createProductId}`)
      .expect(200);
  });
});
