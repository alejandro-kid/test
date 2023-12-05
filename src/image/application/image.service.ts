import { Injectable } from '@nestjs/common';
import { CreateImageDto } from '../domain/dto/create-image.dto';
import { UpdateImageDto } from '../domain/dto/update-image.dto';
import { IImageRepository } from '../domain/interface/image.interface';
import { Image } from '../domain/image.entity';

@Injectable()
export class ImageService {
  private imageRepository: IImageRepository;

  constructor(imageRepository: IImageRepository) {
    this.imageRepository = imageRepository;
  }

  public async create(imagen: CreateImageDto): Promise<Image> {
    try {
      const Imagen: Image = new Image(imagen);

      return await this.imageRepository.addImage(Imagen);
    } catch (error) {
      throw new Error(`Error al intentar crear el registro: ${error.message}`);
    }
  }

  public async findAll(): Promise<Image[]> {
    try {
      return await this.imageRepository.getAllImages();
    } catch (error) {
      throw new Error(
        `Error al intentar obtener la información: ${error.message}`,
      );
    }
  }

  public async findOne(id: number): Promise<Image> {
    try {
      return await this.imageRepository.getOneImage(id);
    } catch (error) {
      throw new Error(
        `Error al intentar obtener el registro: ${error.message}`,
      );
    }
  }

  public async update(id: number, changes: UpdateImageDto): Promise<Image> {
    try {
      return await this.imageRepository.updateImage(id, changes);
    } catch (error) {
      throw new Error(
        `Error al intentar actualizar el registro: ${error.message}`,
      );
    }
  }

  public async remove(id: number): Promise<Image> {
    try {
      return await this.imageRepository.deleteImage(id);
    } catch (error) {
      throw new Error(
        `Error al intentar eliminar el registro: ${error.message}`,
      );
    }
  }
}
