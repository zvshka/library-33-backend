import {CanActivate, ExecutionContext, Inject, UnauthorizedException} from "@nestjs/common";
import * as Passport from "passport"

export class LocalAuthGuard implements CanActivate {
    constructor(@Inject("passport") private readonly passport: Passport.Authenticator) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        request.user = await new Promise((resolve, reject) =>
            this.passport.authenticate('local', (err, user) => {
                try {
                    return resolve(this.handleRequest(err, user));
                } catch (err) {
                    reject(err);
                }
            })(request, response)
        );

        return true;
    }

    private handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}