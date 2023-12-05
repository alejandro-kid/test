import { Injectable } from '@nestjs/common';
import { CreateDetailDto } from '../domain/dto/create-detail.dto';
import { UpdateDetailDto } from '../domain/dto/update-detail.dto';
import { IDetailRepository } from '../domain/interface/detail.interface';
import { Detail } from '../domain/detail.entity';

@Injectable()
export class DetailService {
  private detailRepository: IDetailRepository;

  constructor(detailRepository: IDetailRepository) {
    this.detailRepository = detailRepository;
  }

  public async addDetail(detalle: CreateDetailDto): Promise<Detail> {
    try {
      const Detalle: Detail = new Detail(detalle);

      return await this.detailRepository.addDetail(Detalle);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllDetals(): Promise<Detail[]> {
    try {
      return await this.detailRepository.getAllDetails();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneDetail(id: number): Promise<Detail> {
    try {
      return await this.detailRepository.getOneDetail(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async updateDetail(
    id: number,
    changes: UpdateDetailDto,
  ): Promise<Detail> {
    try {
      return await this.detailRepository.updateDetail(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async deleteDetail(id: number): Promise<Detail> {
    try {
      return await this.detailRepository.deleteDetail(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
