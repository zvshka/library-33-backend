import {applyDecorators, UseGuards} from "@nestjs/common";
import {Roles} from "./roles-auth.decorator";
import {AuthGuard} from "./auth.guard";
import {RolesGuard} from "./roles.guard";

export const Auth = (role = "USER") => {
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}