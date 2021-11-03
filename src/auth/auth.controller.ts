import {Controller, Post, Body} from '@nestjs/common';
import {LoginDTO} from "./DTO/LoginDTO";
import {CreateUserDTO} from "./DTO/CreateUserDTO";
import {AuthService} from "./auth.service";
import {RefreshDTO} from "./DTO/RefreshDTO";
import {ApiOperation} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({
        summary: "Войти в систему",
        description: "При успешной авторизации возвращаются данные пользователя и 2 токена: accessToken и refreshToke. Первый нужен для доступа к API, а второй для обновления первого",
        tags: ["Авторизация"]
    })
    @Post("/login")
    login(@Body() userDTO: LoginDTO) {
        return this.authService.login(userDTO)
    }

    @ApiOperation({summary: "Зарегистрироваться в системе", tags: ["Авторизация"]})
    @Post("/register")
    registration(@Body() userDTO: CreateUserDTO) {
        return this.authService.registration(userDTO)
    }

    @ApiOperation({summary: "Обновить токены в базе данных", tags: ["Авторизация"]})
    @Post("/refresh")
    refresh(@Body() body: RefreshDTO) {
        return this.authService.refresh(body.refreshToken)
    }
}
