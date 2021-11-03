import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {BooksService} from './books.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {ApiOperation} from "@nestjs/swagger";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {
    }

    @ApiOperation({
        tags: ["Книги"]
    })
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @ApiOperation({
        tags: ["Книги"]
    })
    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @ApiOperation({
        tags: ["Книги"]
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(+id);
    }

    @ApiOperation({
        tags: ["Книги"]
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(+id, updateBookDto);
    }

    @ApiOperation({
        tags: ["Книги"]
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(+id);
    }
}
