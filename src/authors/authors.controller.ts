import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {AuthorsService} from './authors.service';
import {CreateAuthorDto} from './dto/create-author.dto';
import {UpdateAuthorDto} from './dto/update-author.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {Auth} from '../auth/decorators/auth.decorator';
import {ADMIN} from "../auth/decorators/roles-auth.decorator";

@ApiTags("Авторы")
@Controller('authors')
export class AuthorsController {
    constructor(private readonly authorsService: AuthorsService) {
    }

    @ApiOperation({
        summary: 'Создать нового автора',
        security: [{bearer: []}],
    })
    @Auth(ADMIN)
    @Post()
    create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.authorsService.create(createAuthorDto);
    }

    @ApiOperation({
        summary: 'Получить всех авторов',
    })
    @Get()
    findAll() {
        return this.authorsService.findAll();
    }

    @ApiOperation({
        summary: 'Получить все книги автора',
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorsService.findOne(+id);
    }

    @ApiOperation({
        security: [{bearer: []}],
        summary: "Обновить автора"
    })
    @Patch(':id')
    @Auth(ADMIN)
    update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.update(+id, updateAuthorDto);
    }

    @ApiOperation({
        security: [{bearer: []}],
        summary: "Удалить автора из базы"
    })
    @Delete(':id')
    @Auth(ADMIN)
    remove(@Param('id') id: string) {
        return this.authorsService.remove(+id);
    }
}
