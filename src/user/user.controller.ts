import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }


    @ApiOperation({
        summary: "Получить всех пользователей", security: [
            {
                "bearer": []
            }
        ]
    })
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get("/all")
    getAll() {
        return this.userService.getAll()
    }
}
