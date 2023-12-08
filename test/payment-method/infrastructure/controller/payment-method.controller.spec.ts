import { Test, TestingModule } from '@nestjs/testing';
import { PaymentMethodController } from '../../../../src/payment-method/infrastructure/controller/payment-method.controller';
import { PaymentMethodService } from '../../../../src/payment-method/application/payment-method.service';
import { PrismaService } from '../../../../src/prisma/application/prisma.service';
import { PaymentMethod } from '../../../../src/payment-method/domain/payment-method.entity';

describe('PaymentMethodController', () => {
  let controller: PaymentMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentMethodController],
      providers: [
        PrismaService,
        {
          provide: PaymentMethodService,
          useValue: PaymentMethod,
        },
      ],
    }).compile();

    controller = module.get<PaymentMethodController>(PaymentMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
