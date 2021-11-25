import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {BooksService} from './books.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ADMIN} from '../auth/decorators/roles-auth.decorator';
import {Auth} from '../auth/decorators/auth.decorator';

@ApiTags("Книги")
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {
    }

    @ApiOperation({
        summary: 'Создать новую книгу',
        security: [{bearer: []}],
    })
    @Auth(ADMIN)
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @ApiOperation({
        summary: "Показать все книги"
    })
    @Get()
    @ApiQuery({
        name: "publisherId",
        required: false
    })
    @ApiQuery({
        name: "stylesId",
        required: false
    })
    @ApiQuery({
        name: "authorsId",
        required: false
    })
    @ApiQuery({
        name: "available",
        required: false
    })
    findAll(
        @Query("page",) page: number,
        @Query("publisherId") publisherId: number,
        @Query("stylesId") stylesId: string,
        @Query("authorsId") authorsId: string,
        @Query("available") available: string
    ) {
        // TODO Pagination
        // TODO Sorting
        // TODO Filtering
        return this.booksService.findAll(page);
    }

    @ApiOperation({
        summary: "Показать информацию о книге"
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(+id);
    }

    @ApiOperation({
        security: [{bearer: []}],
        summary: "Обновить информацию о книге"
    })
    @Patch(':id')
    @Auth(ADMIN)
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(+id, updateBookDto);
    }

    @ApiOperation({
        security: [{bearer: []}],
        summary: "Удалить книгу"
    })
    @Delete(':id')
    @Auth(ADMIN)
    remove(@Param('id') id: string) {
        return this.booksService.remove(+id);
    }
}
