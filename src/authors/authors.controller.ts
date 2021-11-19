import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({
    summary: 'Создать нового автора',
    security: [{ bearer: [] }],
    tags: ['Авторы'],
  })
  @Auth('ADMIN')
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({
    summary: 'Получить всех авторов',
    security: [{ bearer: [] }],
    tags: ['Авторы'],
  })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({
    tags: ['Авторы'],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @ApiOperation({
    tags: ['Авторы'],
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @ApiOperation({
    tags: ['Авторы'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
