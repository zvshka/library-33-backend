import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles-auth.decorator";
import {TokensService} from "../services/tokens.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private tokensService: TokensService,
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
            return requiredRoles.includes(req.user.role) || req.user.role === "ADMIN"
        } catch (e) {
            throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
        }
    }

}