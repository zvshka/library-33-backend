import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OffencesService } from './offences.service';
import { CreateOffenceDto } from './dto/create-offence.dto';
import { UpdateOffenceDto } from './dto/update-offence.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Проступки")
@Controller('offences')
export class OffencesController {
  constructor(private readonly offencesService: OffencesService) {}

  @Post()
  create(@Body() createOffenceDto: CreateOffenceDto) {
    return this.offencesService.create(createOffenceDto);
  }

  @Get()
  findAll() {
    return this.offencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOffenceDto: UpdateOffenceDto) {
    return this.offencesService.update(+id, updateOffenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offencesService.remove(+id);
  }
}
