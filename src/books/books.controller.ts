import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import {BooksService} from './books.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {ADMIN} from '../auth/decorators/roles-auth.decorator';
import {Auth} from '../auth/decorators/auth.decorator';
import {CreateRealBookDto} from "./dto/create-real-book.dto";
import {GetPageDto} from "./dto/get-page.dto";

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
        summary: 'Создать новую книгу',
        security: [{bearer: []}],
    })
    @Auth(ADMIN)
    @Post("/real")
    createReal(@Body() createRealBookDto: CreateRealBookDto) {
        return this.booksService.createReal(createRealBookDto);
    }

    @ApiOperation({
        summary: "Показать все книги"
    })
    @Get()
    @ApiQuery({
        name: "page",
        required: true,
        type: Number
    })
    @ApiQuery({
        name: "publisherId",
        required: false
    })
    @ApiQuery({
        name: "stylesId",
        required: false,
        type: [Number]
    })
    @ApiQuery({
        name: "authorsId",
        required: false,
        type: [Number]
    })
    @ApiQuery({
        name: "available",
        required: false,
        type: String,
        enum: ["all", "true", "false"]
    })
    @UseInterceptors(ClassSerializerInterceptor)
    getPage(
        @Query() query: GetPageDto,
    ) {
        return this.booksService.getPage(query);
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

    @ApiOperation({
        security: [{bearer: []}],
        summary: "Удалить книгу"
    })
    @Delete('/real/:id')
    @Auth(ADMIN)
    removeReal(@Param('id') id: string) {
        return this.booksService.removeReal(+id);
    }
}
