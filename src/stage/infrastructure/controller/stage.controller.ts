import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StageService } from '../../application/stage.service';
import { CreateStageDto } from '../../domain/dto/create-stage.dto';
import { UpdateStageDto } from '../../domain/dto/update-stage.dto';
import { StageRepositoryPrismaPsql } from '../stage.repository';
import { PrismaService } from '../../../prisma/application/prisma.service';

@Controller('stages')
export class StageController {
  private readonly stageService: StageService;

  constructor(private readonly prisma: PrismaService) {
    const stageRepository = new StageRepositoryPrismaPsql(prisma);
    this.stageService = new StageService(stageRepository);
  }

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stageService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    return this.stageService.update(+id, updateStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stageService.remove(+id);
  }
}
