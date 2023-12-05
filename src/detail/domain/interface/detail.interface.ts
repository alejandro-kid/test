import { Detail } from '../detail.entity';
import { UpdateDetailDto } from '../dto/update-detail.dto';

export interface IDetailRepository {
  addDetail(detail: Detail): Promise<Detail>;
  getAllDetails(): Promise<Detail[]>;
  getOneDetail(id: number): Promise<Detail>;
  updateDetail(id: number, changes: UpdateDetailDto): Promise<Detail>;
  deleteDetail(id: number): Promise<Detail>;
}
