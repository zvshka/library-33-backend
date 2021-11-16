import {HttpException, HttpStatus, Injectable, Request, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../users/users.service";
import {compare, hash} from "bcrypt"
import {TokensService} from "./tokens.service";
import {RegisterDto} from "../dto/register.dto";
import {UserDto} from "../dto/user.dto";
import {LoginDto} from "../dto/login.dto";
import {UserEntity} from "../../users/entities/user.entity";
import {Session} from "express-session";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokensService: TokensService,
    ) {
    }

    async login(loginDto: LoginDto, session): Promise<UserDto> {
        const user = await this.validateUser(loginDto.username, loginDto.password)
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        session.userId = user.id
        // session.save(err => console.log(err))
        return {...tokens, user: new UserEntity(user)}
    }

    async registration(registerDto: RegisterDto): Promise<UserDto> {
        let candidate = await this.usersService.findByEmail(registerDto.email)
        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
        candidate = await this.usersService.findByUsername(registerDto.username)
        if (candidate) {
            throw new HttpException("Пользователь с таким username уже существует", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await hash(registerDto.password, 5)
        const user = await this.usersService.create({...registerDto, password: hashPassword})
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user: new UserEntity(user)}
    }

    async refresh(refreshToken): Promise<UserDto> {
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
        return {...tokens, user: new UserEntity(user)}
    }

    async validateUser(username, password) {
        const user = await this.usersService.findByUsername(username)
        if (user) {
            const passwordEquals = await compare(password, user.password)
            if (passwordEquals) {
                return user
            }
        }
        throw new UnauthorizedException({message: "Invalid username or password"})
    }
}
