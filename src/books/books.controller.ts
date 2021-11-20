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
import {BooksService} from './books.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {ApiOperation} from '@nestjs/swagger';
import {ADMIN, Roles} from '../auth/decorators/roles-auth.decorator';
import {RolesGuard} from '../auth/guards/roles.guard';
import {Auth} from '../auth/decorators/auth.decorator';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {
    }

    @ApiOperation({
        summary: 'Создать новую книгу',
        security: [{bearer: []}],
        tags: ['Книги'],
    })
    @Auth(ADMIN)
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @ApiOperation({
        tags: ['Книги'],
        summary: "Показать все книги"
    })
    @Get()
    findAll() {
        return this.booksService.findAll();
    }

    @ApiOperation({
        tags: ['Книги'],
        summary: "Показать информацию о книге"
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(+id);
    }

    @ApiOperation({
        tags: ['Книги'],
        security: [{bearer: []}],
        summary: "Обновить информацию о книге"
    })
    @Patch(':id')
    @Auth(ADMIN)
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.booksService.update(+id, updateBookDto);
    }

    @ApiOperation({
        tags: ['Книги'],
        security: [{bearer: []}],
        summary: "Удалить книгу"
    })
    @Delete(':id')
    @Auth(ADMIN)
    remove(@Param('id') id: string) {
        return this.booksService.remove(+id);
    }
}
