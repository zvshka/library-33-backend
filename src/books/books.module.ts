import { forwardRef, Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { AuthModule } from "../auth/auth.module";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, UsersService],
  imports: [
    forwardRef(() => AuthModule)
  ]
})
export class BooksModule {
}
