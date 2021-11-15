import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {StylesService} from './styles.service';
import {CreateStyleDto} from './dto/create-style.dto';
import {UpdateStyleDto} from './dto/update-style.dto';
import {ApiOperation} from "@nestjs/swagger";
import {Roles} from "../auth/decorators/roles-auth.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Auth} from "../auth/decorators/auth.decorator";

@Controller('styles')
export class StylesController {
    constructor(private readonly stylesService: StylesService) {
    }

    @ApiOperation({
        summary: "Создать новый жанр",
        security: [{bearer: []}],
        tags: ["Жанры"]
    })
    @Auth("ADMIN")
    @Post()
    create(@Body() createStyleDto: CreateStyleDto) {
        return this.stylesService.create(createStyleDto);
    }

    @ApiOperation({
        tags: ["Жанры"]
    })
    @Get()
    findAll() {
        return this.stylesService.findAll();
    }

    @ApiOperation({
        tags: ["Жанры"]
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.stylesService.findOne(+id);
    }

    @ApiOperation({
        tags: ["Жанры"]
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStyleDto: UpdateStyleDto) {
        return this.stylesService.update(+id, updateStyleDto);
    }

    @ApiOperation({
        tags: ["Жанры"]
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.stylesService.remove(+id);
    }
}
