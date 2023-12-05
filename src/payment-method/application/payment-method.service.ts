import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from '../domain/dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from '../domain/dto/update-payment-method.dto';
import { IPaymentMethodRepository } from '../domain/interface/payment-method.interface';
import { PaymentMethod } from '../domain/payment-method.entity';

@Injectable()
export class PaymentMethodService {
  private pmethodRepository: IPaymentMethodRepository;

  constructor(pmethodRepository: IPaymentMethodRepository) {
    this.pmethodRepository = pmethodRepository;
  }

  public async create(metodo: CreatePaymentMethodDto) {
    try {
      const Metodo: PaymentMethod = new PaymentMethod(metodo);

      return await this.pmethodRepository.addPaymentMethod(Metodo);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async findAll() {
    try {
      return await this.pmethodRepository.getAllPaymentMethods();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async findOne(id: number) {
    try {
      return await this.pmethodRepository.getOnePaymentMethod(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async update(id: number, changes: UpdatePaymentMethodDto) {
    try {
      return await this.pmethodRepository.updatePaymentMethod(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async remove(id: number) {
    try {
      return await this.pmethodRepository.deletePaymentMethod(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
