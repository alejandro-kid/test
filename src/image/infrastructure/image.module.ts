import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [ImageController],
  providers: [PrismaService],
})
export class ImageModule {}
