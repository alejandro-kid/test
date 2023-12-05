import { UpdateStageDto } from '../dto/update-stage.dto';
import { Stage } from '../stage.entity';

export interface IStageRepository {
  addStage(detail: Stage): Promise<Stage>;
  getAllStages(): Promise<Stage[]>;
  getOneStage(id: number): Promise<Stage>;
  updateStage(id: number, changes: UpdateStageDto): Promise<Stage>;
  deleteStage(id: number): Promise<Stage>;
}
