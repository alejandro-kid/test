import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageService } from '../../application/image.service';
import { CreateImageDto } from '../../domain/dto/create-image.dto';
import { UpdateImageDto } from '../../domain/dto/update-image.dto';
import { ImageRepositoryPrismaPsql } from '../image.repository';
import { PrismaService } from '../../../prisma/application/prisma.service';

@Controller('images')
export class ImageController {
  private readonly imageService: ImageService;

  constructor(private readonly prisma: PrismaService) {
    const imageRepository = new ImageRepositoryPrismaPsql(prisma);
    this.imageService = new ImageService(imageRepository);
  }

  @Post()
  create(@Body() imagen: CreateImageDto) {
    return this.imageService.create(imagen);
  }

  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() changes: UpdateImageDto) {
    return this.imageService.update(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.imageService.remove(+id);
  }
}
