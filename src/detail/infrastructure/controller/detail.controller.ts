import { DetailService } from './../../application/detail.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateDetailDto } from '../../domain/dto/create-detail.dto';
import { UpdateDetailDto } from '../../domain/dto/update-detail.dto';
import { DetailRepositoryPrismaPsql } from '../detail.repository';
import { PrismaService } from '../../../prisma/application/prisma.service';
import { Detail } from '../../domain/detail.entity';

@Controller('details')
export class DetailController {
  private readonly detailService: DetailService;

  constructor(private readonly prisma: PrismaService) {
    const detailRepository = new DetailRepositoryPrismaPsql(prisma);
    this.detailService = new DetailService(detailRepository);
  }

  @Post()
  create(@Body() detalle: CreateDetailDto): Promise<Detail> {
    return this.detailService.addDetail(detalle);
  }

  @Get()
  findAll(): Promise<Detail[]> {
    return this.detailService.getAllDetals();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Detail> {
    return this.detailService.getOneDetail(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() changes: UpdateDetailDto,
  ): Promise<Detail> {
    return this.detailService.updateDetail(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Detail> {
    return this.detailService.deleteDetail(+id);
  }
}
