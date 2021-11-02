import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDTO} from "./DTO/LoginDTO";
import {CreateUserDTO} from "./DTO/CreateUserDTO";
import {UserService} from "../user/user.service";
import {hash, compare} from "bcrypt"
import {TokensService} from "./tokens.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private tokensService: TokensService) {
    }

    async login(userDTO: LoginDTO) {
        const user = await this.validateUser(userDTO)
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user}
    }

    async registration(userDTO: CreateUserDTO) {
        const candidate = await this.userService.getUserByEmail(userDTO.email)
        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", 400)
        }
        const hashPassword = await hash(userDTO.password, 5)
        const user = await this.userService.createUser({...userDTO, password: hashPassword})
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
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

        const user = await this.userService.getUserByEmail(userData.email)
        const tokens = this.tokensService.generateToken(user)
        await this.tokensService.saveToken(user.id, tokens.refreshToken)
        return {...tokens, user}
    }

    private async validateUser(userDTO: LoginDTO) {
        const user = await this.userService.getUserByEmail(userDTO.email)
        if (user) {
            const passwordEquals = await compare(userDTO.password, user.password)
            if (passwordEquals) {
                return user
            }
        }
        throw new UnauthorizedException({message: "Некорректный Email или пароль"})
    }
}
