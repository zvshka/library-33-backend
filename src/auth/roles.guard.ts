import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";
import {TokensService} from "./tokens.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private tokensService: TokensService,
                private usersService: UsersService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true
            }
            const authHeader = req.headers.authorization
            const [tokenType, token] = authHeader.split(" ")
            if (tokenType !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }
            req.user = this.tokensService.validateAccessToken(token)
            return requiredRoles.includes(req.user.role)
        } catch (e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
        }
    }

}