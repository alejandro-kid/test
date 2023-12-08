import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodService } from '../../../src/payment-method/application/payment-method.service';
import { PaymentMethod } from '../../../src/payment-method/domain/payment-method.entity';

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentMethodService,
          useValue: PaymentMethod,
        },
      ],
    }).compile();

    service = module.get<PaymentMethodService>(PaymentMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
