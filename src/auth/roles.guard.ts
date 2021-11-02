import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
            console.log(tokenType, token)
            if (tokenType !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }
            req.user = this.jwtService.verify(token)
            return requiredRoles.includes(req.user.role)
        } catch (e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
        }
    }

}