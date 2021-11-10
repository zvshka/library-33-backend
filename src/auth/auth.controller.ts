import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { ValidationPipe } from "./validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({
    summary: "Войти в систему",
    description: "При успешной авторизации возвращаются данные пользователя и 2 токена: accessToken и refreshToke. Первый нужен для доступа к API, а второй для обновления первого",
    tags: ["Авторизация"]
  })
  @Post("/login")
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: "Зарегистрироваться в системе", tags: ["Авторизация"] })
  @Post("/register")
  @UsePipes(ValidationPipe)
  registration(@Body() registerDto: RegisterDto) {
    return this.authService.registration(registerDto);
  }

  @ApiOperation({ summary: "Обновить токены в базе данных", tags: ["Авторизация"] })
  @Post("/refresh")
  @UsePipes(ValidationPipe)
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
