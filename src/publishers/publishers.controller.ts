import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {PublishersService} from './publishers.service';
import {CreatePublisherDto} from './dto/create-publisher.dto';
import {UpdatePublisherDto} from './dto/update-publisher.dto';
import {ApiOperation} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('publishers')
export class PublishersController {
    constructor(private readonly publishersService: PublishersService) {
    }

    @ApiOperation({
        summary: "Создать нового издателя",
        security: [{bearer: []}],
        tags: ["Издатели"]
    })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createPublisherDto: CreatePublisherDto) {
        return this.publishersService.create(createPublisherDto);
    }

    @ApiOperation({
        tags: ["Издатели"]
    })
    @Get()
    findAll() {
        return this.publishersService.findAll();
    }

    @ApiOperation({
        tags: ["Издатели"]
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publishersService.findOne(+id);
    }

    @ApiOperation({
        tags: ["Издатели"]
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
        return this.publishersService.update(+id, updatePublisherDto);
    }

    @ApiOperation({
        tags: ["Издатели"]
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publishersService.remove(+id);
    }
}
