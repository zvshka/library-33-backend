import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { StylesModule } from './styles/styles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, AuthModule, BooksModule, AuthorsModule, StylesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}