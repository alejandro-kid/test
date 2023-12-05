import { Module } from '@nestjs/common';
import { PaymentMethodController } from './controller/payment-method.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [PaymentMethodController],
  providers: [PrismaService],
})
export class PaymentMethodModule {}
