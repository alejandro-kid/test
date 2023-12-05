import { Injectable } from '@nestjs/common';
import { CreateStageDto } from '../domain/dto/create-stage.dto';
import { UpdateStageDto } from '../domain/dto/update-stage.dto';
import { IStageRepository } from '../domain/interface/stage.interface';
import { Stage } from '../domain/stage.entity';

@Injectable()
export class StageService {
  private stageRepository: IStageRepository;

  constructor(stageRepository: IStageRepository) {
    this.stageRepository = stageRepository;
  }

  public async create(estado: CreateStageDto) {
    try {
      const Detalle: Stage = new Stage(estado);

      return await this.stageRepository.addStage(Detalle);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async findAll() {
    try {
      return await this.stageRepository.getAllStages();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async findOne(id: number) {
    try {
      return await this.stageRepository.getOneStage(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async update(id: number, changes: UpdateStageDto) {
    try {
      return await this.stageRepository.updateStage(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async remove(id: number) {
    try {
      return await this.stageRepository.deleteStage(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
