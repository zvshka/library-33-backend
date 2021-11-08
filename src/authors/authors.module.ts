import {forwardRef, Module} from '@nestjs/common';
import {AuthorsService} from './authors.service';
import {AuthorsController} from './authors.controller';
import {PrismaService} from "../prisma/prisma.service";
import {AuthModule} from "../auth/auth.module";
import {UsersService} from "../users/users.service";

@Module({
    controllers: [AuthorsController],
    providers: [AuthorsService, PrismaService, UsersService],
    imports: [
        forwardRef(() => AuthModule)
    ],
})
export class AuthorsModule {
}
