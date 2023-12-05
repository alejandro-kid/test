import { Stage } from '../domain/stage.entity';
import { IStageRepository } from '../domain/interface/stage.interface';
import { UpdateStageDto } from '../domain/dto/update-stage.dto';
import { PrismaService } from '../../prisma/application/prisma.service';

export class StageRepositoryPrismaPsql implements IStageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addStage(detalle: Stage): Promise<Stage> {
    try {
      return await this.prisma.stage.create({
        data: detalle,
      });
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async getAllStages(): Promise<Stage[]> {
    try {
      return await this.prisma.stage.findMany({
        orderBy: {
          stage: 'asc',
        },
      });
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async getOneStage(id: number): Promise<Stage> {
    try {
      const founded = await this.prisma.stage.findUnique({
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

  public async updateStage(
    id: number,
    changes: UpdateStageDto,
  ): Promise<Stage> {
    try {
      const founded = await this.getOneStage(id);

      const updated = await this.prisma.stage.update({
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

  public async deleteStage(id: number): Promise<Stage> {
    try {
      const founded = await this.getOneStage(id);

      return await this.prisma.stage.delete({
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
