import { UpdatePaymentMethodDto } from '../dto/update-payment-method.dto';
import { PaymentMethod } from '../payment-method.entity';

export interface IPaymentMethodRepository {
  addPaymentMethod(detail: PaymentMethod): Promise<PaymentMethod>;
  getAllPaymentMethods(): Promise<PaymentMethod[]>;
  getOnePaymentMethod(id: number): Promise<PaymentMethod>;
  updatePaymentMethod(
    id: number,
    changes: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod>;
  deletePaymentMethod(id: number): Promise<PaymentMethod>;
}
