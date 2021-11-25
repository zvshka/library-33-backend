import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {StylesService} from './styles.service';
import {CreateStyleDto} from './dto/create-style.dto';
import {UpdateStyleDto} from './dto/update-style.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ADMIN} from '../auth/decorators/roles-auth.decorator';
import {Auth} from '../auth/decorators/auth.decorator';

@ApiTags("Жанры")
@Controller('styles')
export class StylesController {
    constructor(private readonly stylesService: StylesService) {
    }

    @ApiOperation({
        summary: 'Создать новый жанр',
        security: [{bearer: []}],
    })
    @Auth(ADMIN)
    @Post()
    create(@Body() createStyleDto: CreateStyleDto) {
        return this.stylesService.create(createStyleDto);
    }

    @ApiOperation({
        summary: "Показать все жанры"
    })
    @Get()
    findAll() {
        return this.stylesService.findAll();
    }

    @ApiOperation({
        summary: "Показать информацию о жанре"
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.stylesService.findOne(+id);
    }

    @ApiOperation({
        summary: "Обновить жанр"
    })
    @Patch(':id')
    @Auth(ADMIN)
    update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
        return this.stylesService.update(+id, updateStyleDto);
    }

    @ApiOperation({
        summary: "Удалить жанр"
    })
    @Delete(':id')
    @Auth(ADMIN)
    remove(@Param('id') id: string) {
        return this.stylesService.remove(+id);
    }
}
