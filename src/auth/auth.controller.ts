import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {RefreshDto} from './dto/refresh.dto';
import {AuthService} from './services/auth.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {UserDto} from './dto/user.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({
        summary: 'Войти в систему',
        description:
            'При успешной авторизации возвращаются данные пользователя и 2 токена: accessToken и refreshToke. Первый нужен для доступа к API, а второй для обновления первого',
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<UserDto> {
        return this.authService.login(loginDto);
    }

    @ApiOperation({
        summary: 'Зарегистрироваться в системе',
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/register')
    registration(@Body() registerDto: RegisterDto): Promise<UserDto> {
        return this.authService.registration(registerDto);
    }

    @ApiOperation({
        summary: 'Обновить токены в базе данных',
    })
    @Post('/refresh')
    refresh(@Body() refreshDto: RefreshDto) {
        return this.authService.refresh(refreshDto.refreshToken);
    }
}
