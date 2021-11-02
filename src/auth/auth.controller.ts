import {Controller, Post, Body} from '@nestjs/common';
import {LoginDTO} from "./DTO/LoginDTO";
import {CreateUserDTO} from "./DTO/CreateUserDTO";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post("/login")
    login(@Body() userDTO: LoginDTO) {
        return this.authService.login(userDTO)
    }

    @Post("/register")
    registration(@Body() userDTO: CreateUserDTO) {
        return this.authService.registration(userDTO)
    }
}
