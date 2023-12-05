import { Module } from '@nestjs/common';
import { StageController } from './controller/stage.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [StageController],
  providers: [PrismaService],
})
export class StageModule {}
