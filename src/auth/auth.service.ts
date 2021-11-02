import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDTO} from "./DTO/LoginDTO";
import {CreateUserDTO} from "./DTO/CreateUserDTO";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {hash, compare} from "bcrypt"
import {UserDTO} from "../user/DTO/UserDTO";
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async login(userDTO: LoginDTO) {
        const user = await this.validateUser(userDTO)
        return this.generateToken(user)
    }

    async registration(userDTO: CreateUserDTO) {
        const candidate = await this.userService.getUserByEmail(userDTO.email)
        if (candidate) {
            throw new HttpException("Пользоавтель с таким email уже существует", 400)
        }
        const hashPassword = await hash(userDTO.password, 5)
        const user = await this.userService.createUser({...userDTO, password: hashPassword})
        return this.generateToken(user)
    }

    private generateToken(user: UserDTO) {
        const payload = {email: user.email, id: user.id, role: user.role, name: user.name}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDTO: LoginDTO) {
        const user = await this.userService.getUserByEmail(userDTO.email)
        const passwordEquals = await compare(userDTO.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: "Некорректный Email или пароль"})
    }
}
