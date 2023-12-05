import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentMethodService } from '../../application/payment-method.service';
import { CreatePaymentMethodDto } from '../../domain/dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../../domain/dto/update-payment-method.dto';
import { PaymentMethodRepositoryPrismaPsql } from '../payment-method.repository';
import { PrismaService } from '../../../prisma/application/prisma.service';

@Controller('payment-methods')
export class PaymentMethodController {
  private readonly paymentMethodService: PaymentMethodService;

  constructor(private readonly prisma: PrismaService) {
    const pmethodRepository = new PaymentMethodRepositoryPrismaPsql(prisma);
    this.paymentMethodService = new PaymentMethodService(pmethodRepository);
  }

  @Post()
  create(@Body() metodo: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(metodo);
  }

  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.paymentMethodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() changes: UpdatePaymentMethodDto) {
    return this.paymentMethodService.update(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.paymentMethodService.remove(+id);
  }
}
