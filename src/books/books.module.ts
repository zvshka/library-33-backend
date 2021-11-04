import {forwardRef, Module} from '@nestjs/common';
import {BooksService} from './books.service';
import {BooksController} from './books.controller';
import {AuthModule} from "../auth/auth.module";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    controllers: [BooksController],
    providers: [BooksService, PrismaService],
    imports: [
        forwardRef(() => AuthModule)
    ]
})
export class BooksModule {
}
