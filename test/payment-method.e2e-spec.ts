import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PaymentMethodContmethodler (e2e)', () => {
  let app;
  let createPaymentMethodId;

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

  it('should create a method', async () => {
    const method = {
      method: 'Testing',
      description: 'An example method for testing',
    };

    const { body } = await request(app.getHttpServer())
      .post('/payment-methods')
      .send(method)
      .expect(201);

    expect(body).toBeDefined();
    expect(body.method).toEqual(method.method);

    createPaymentMethodId = body.id;
  });

  it('should get all methodes', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/payment-methods')
      .expect(200);

    expect(body).toBeDefined();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });

  it('should get a method by ID', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/payment-methods/${createPaymentMethodId}`)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.method).toEqual('Testing');
  });

  it('should update a method', async () => {
    const updatePaymentMethod = {
      method: 'UpdatedTest',
      description: 'An updated method for testing',
    };

    const { body } = await request(app.getHttpServer())
      .patch(`/payment-methods/${createPaymentMethodId}`)
      .send(updatePaymentMethod)
      .expect(200);

    expect(body).toBeDefined();
    expect(body.method).toEqual(updatePaymentMethod.method);
  });

  it('should deleted a method', async () => {
    await request(app.getHttpServer())
      .delete(`/payment-methods/${createPaymentMethodId}`)
      .expect(200);
  });
});
