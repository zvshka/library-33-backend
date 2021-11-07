import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {hash, compare} from "bcrypt"
import {TokensService} from "./tokens.service";
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private tokensService: TokensService) {
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto)
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        delete user.secret
        delete user.password
        return {...tokens, user}
    }

    async registration(registerDto: RegisterDto) {
        const candidate = await this.usersService.findByEmail(registerDto.email)
        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await hash(registerDto.password, 5)
        const user = await this.usersService.create({...registerDto, password: hashPassword})
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        delete user.secret
        delete user.password
        return {...tokens, user}
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedException({message: "Нет refresh токена"})
        }

        const userData = this.tokensService.validateRefreshToken(refreshToken)
        const tokenData = await this.tokensService.findToken(refreshToken)

        if (!userData || !tokenData) {
            throw new UnauthorizedException({message: "Нет refresh токена"})
        }

        const user = await this.usersService.findByEmail(userData.email)
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        delete user.secret
        delete user.password
        return {...tokens, user}
    }

    private async validateUser(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email)
        if (user) {
            const passwordEquals = await compare(loginDto.password, user.password)
            if (passwordEquals) {
                return user
            }
        }
        throw new UnauthorizedException({message: "Некорректный Email или пароль"})
    }
}
