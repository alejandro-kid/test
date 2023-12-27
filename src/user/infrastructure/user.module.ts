import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { PrismaService } from '../../prisma/application/prisma.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService],
})
export class UserModule {}
