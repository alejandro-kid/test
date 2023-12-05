import { UpdateImageDto } from '../dto/update-image.dto';
import { Image } from '../image.entity';

export interface IImageRepository {
  addImage(image: Image): Promise<Image>;
  getAllImages(): Promise<Image[]>;
  getOneImage(id: number): Promise<Image>;
  updateImage(id: number, changes: UpdateImageDto): Promise<Image>;
  deleteImage(id: number): Promise<Image>;
}
