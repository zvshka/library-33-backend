import {forwardRef, Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {AuthModule} from "../auth/auth.module";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    imports: [
        forwardRef(() => AuthModule)
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {
}
