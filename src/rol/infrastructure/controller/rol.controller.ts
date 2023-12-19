import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolService } from '../../application/rol.service';
import { CreateRolDto } from '../../domain/dto/create-rol.dto';
import { UpdateRolDto } from '../../domain/dto/update-rol.dto';
import { PrismaService } from '../../../prisma/application/prisma.service';
import { RolRepositoryPrismaPsql } from '../rol.repository';

@Controller('roles')
export class RolController {
  private readonly rolService: RolService;

  constructor(private readonly prisma: PrismaService) {
    const rolRepository = new RolRepositoryPrismaPsql(prisma);
    this.rolService = new RolService(rolRepository);
  }

  @Post()
  create(@Body() rol: CreateRolDto) {
    return this.rolService.create(rol);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() changes: UpdateRolDto) {
    return this.rolService.update(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolService.remove(+id);
  }
}
