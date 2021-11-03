import {Body, Controller, Get, Patch, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation} from "@nestjs/swagger";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateInfoDTO} from "./DTO/UpdateInfoDTO";
import {UserDTO} from "./DTO/UserDTO";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }


    @ApiOperation({
        summary: "Обновить информацию о пользователе",
        security: [{bearer: []}],
        tags: ["Пользователь"]
    })
    @UseGuards(JwtAuthGuard)
    @Patch("/update")
    updateInfo(@Req() request, @Body() updateInfo: UpdateInfoDTO) {
        const user: UserDTO = request.user
        return this.userService.updateInfo(user.id, updateInfo)
    }

    @ApiOperation({
        summary: "Получить всех пользователей",
        security: [{"bearer": []}],
        tags: ["Пользователь"]
    })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/all")
    getAll() {
        return this.userService.getAll()
    }
}
