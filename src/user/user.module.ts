import {forwardRef, Module} from '@nestjs/common';
import {UserService} from "./user.service";
import {PrismaService} from "../prisma/prisma.service";
import {UserController} from "./user.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
    providers: [PrismaService, UserService],
    controllers: [UserController],
    imports: [
        forwardRef(() => AuthModule)
    ],
    exports: [UserService]
})
export class UserModule {}
