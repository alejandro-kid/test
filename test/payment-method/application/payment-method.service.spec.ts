import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodService } from '../../../src/payment-method/application/payment-method.service';

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentMethodService],
    }).compile();

    service = module.get<PaymentMethodService>(PaymentMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
