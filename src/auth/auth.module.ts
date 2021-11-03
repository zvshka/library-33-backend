import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PrismaService} from "../prisma/prisma.service";
import { TokensService } from './tokens.service';

@Module({
    providers: [AuthService, PrismaService, TokensService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: {
                expiresIn: "24h"
            }
        })],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {
}
