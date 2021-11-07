import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {TokensService} from "./tokens.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private tokensService: TokensService,
                private usersService: UsersService) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const [tokenType, token] = authHeader.split(" ")
            if (tokenType !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }
            const userData = this.tokensService.validateAccessToken(token)
            req.user = await this.usersService.findById(userData.id)
            return true
        } catch (e) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }
    }

}