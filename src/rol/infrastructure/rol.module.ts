import { Module } from '@nestjs/common';
import { RolController } from './controller/rol.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [RolController],
  providers: [PrismaService],
})
export class RolModule {}
