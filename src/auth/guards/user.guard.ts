import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../../users/users.service";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private usersService: UsersService) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        if (!req.session.userId) {
            throw new UnauthorizedException()
        }
        const user = await this.usersService.findById(req.session.userId)
        if (!user) {
            throw new UnauthorizedException()
        }
        req.user = user
        return req.user !== undefined;
    }
}