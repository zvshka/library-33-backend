import {CanActivate, ExecutionContext} from "@nestjs/common";

export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        return undefined;
    }

}