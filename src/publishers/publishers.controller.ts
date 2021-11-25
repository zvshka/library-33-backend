import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {PublishersService} from './publishers.service';
import {CreatePublisherDto} from './dto/create-publisher.dto';
import {UpdatePublisherDto} from './dto/update-publisher.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ADMIN} from '../auth/decorators/roles-auth.decorator';
import {Auth} from '../auth/decorators/auth.decorator';

@ApiTags("Издатели")
@Controller('publishers')
export class PublishersController {
    constructor(private readonly publishersService: PublishersService) {
    }

    @ApiOperation({
        summary: 'Создать нового издателя',
        security: [{bearer: []}],
    })
    @Auth(ADMIN)
    @Post()
    create(@Body() createPublisherDto: CreatePublisherDto) {
        return this.publishersService.create(createPublisherDto);
    }

    @ApiOperation({
        summary: "Показать всех издателей"
    })
    @Get()
    findAll() {
        return this.publishersService.findAll();
    }

    @ApiOperation({
        summary: "Показать информацию о издателе"
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publishersService.findOne(+id);
    }

    @ApiOperation({
        summary: "Обновить информацию об издателе"
    })
    @Patch(':id')
    @Auth(ADMIN)
    update(
        @Param('id') id: string,
        @Body() updatePublisherDto: UpdatePublisherDto,
    ) {
        return this.publishersService.update(+id, updatePublisherDto);
    }

    @ApiOperation({
        summary: "Удалить издателя"
    })
    @Auth(ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publishersService.remove(+id);
    }
}
