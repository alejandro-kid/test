import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../../application/user.service';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { PrismaService } from '../../../prisma/application/prisma.service';
import { User } from '../../domain/user.entity';
import { UserRepositoryPrismaPsql } from '../user.repository';

@Controller('users')
export class UserController {
  private readonly userService: UserService;

  constructor(private readonly prsima: PrismaService) {
    const userRepository = new UserRepositoryPrismaPsql(prsima);
    this.userService = new UserService(userRepository);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() changes: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(+id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<User> {
    return this.userService.remove(+id);
  }
}
