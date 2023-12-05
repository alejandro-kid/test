import { PrismaService } from 'src/prisma/application/prisma.service';
import { IPaymentMethodRepository } from '../domain/interface/payment-method.interface';
import { PaymentMethod } from '../domain/payment-method.entity';
import { UpdatePaymentMethodDto } from '../domain/dto/update-payment-method.dto';

export class PaymentMethodRepositoryPrismaPsql
  implements IPaymentMethodRepository
{
  constructor(private readonly prisma: PrismaService) {}

  public async addPaymentMethod(
    detalle: PaymentMethod,
  ): Promise<PaymentMethod> {
    try {
      return await this.prisma.paymentMethod.create({
        data: detalle,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      return await this.prisma.paymentMethod.findMany({
        orderBy: {
          method: 'asc',
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOnePaymentMethod(id: number): Promise<PaymentMethod> {
    try {
      const founded = await this.prisma.paymentMethod.findUnique({
        where: {
          id: id,
        },
      });

      if (!founded.id) {
        throw new Error(`No se encontró el registro`);
      } else return founded;
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async updatePaymentMethod(
    id: number,
    changes: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    try {
      const founded = await this.getOnePaymentMethod(id);

      const updated = await this.prisma.paymentMethod.update({
        where: {
          id: founded.id,
        },
        data: changes,
      });

      if (!updated.id) {
        throw new Error(`Error al intentar actualizar el registro`);
      }
      return updated;
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async deletePaymentMethod(id: number): Promise<PaymentMethod> {
    try {
      const founded = await this.getOnePaymentMethod(id);

      return await this.prisma.paymentMethod.delete({
        where: {
          id: founded.id,
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
