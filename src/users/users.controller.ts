import {Body, ClassSerializerInterceptor, Controller, Get, Patch, Session, UseInterceptors} from "@nestjs/common";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UserEntity} from "./entities/user.entity";
import {User} from "../auth/decorators/user.decorator";
import {Auth} from "../auth/decorators/auth.decorator";
import {UpdateDto} from "./dto/update.dto";
import {SessionDto} from "./dto/session.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({
        summary: "Обновить информацию о себе",
        security: [{bearer: []}],
        tags: ["Пользователь"]
    })
    @Auth()
    @Patch("/@me")
    updateMe(@User() user: UserEntity, @Body() updateDto: UpdateDto) {
        return this.usersService.updateMe(user.id, updateDto);
    }

    @ApiOperation({
        summary: "Получить подробную информацию о себе",
        security: [{bearer: []}],
        tags: ["Пользователь"]
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get("/@me/")
    aboutMe(@Session() session: SessionDto): UserEntity {
        return session.user
    }

    @ApiOperation({
        summary: "Получить всех пользователей",
        security: [{bearer: []}],
        tags: ["Пользователь"]
    })
    @ApiResponse({
        type: [UserEntity]
    })
    @Auth("ADMIN")
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
