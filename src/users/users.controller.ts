import {Controller, Get, Patch, Req, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({
        summary: "Обновить информацию о себе",
        security: [{bearer: []}],
        tags: ["Пользователь"],
    })
    @Patch("/@me")
    updateMe() {

    }

    @ApiOperation({
        summary: "Получить подробную информацию о себе",
        security: [{bearer: []}],
        tags: ["Пользователь"],
    })
    @UseGuards(JwtAuthGuard)
    @Get("/@me")
    aboutMe(@Req() request) {
        return this.usersService.aboutMe(request.user.id)
    }

    @ApiOperation({
        summary: "Получить всех пользователей",
        security: [{bearer: []}],
        tags: ["Пользователь"],
    })
    @ApiResponse({
        type: [User]
    })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
