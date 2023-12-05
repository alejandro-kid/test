import { Module } from '@nestjs/common';
import { DetailController } from './controller/detail.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [DetailController],
  providers: [PrismaService],
})
export class DetailModule {}
