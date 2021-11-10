import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {BooksModule} from './books/books.module';
import {AuthorsModule} from './authors/authors.module';
import {StylesModule} from './styles/styles.module';
import {UsersModule} from './users/users.module';
import {PublishersModule} from './publishers/publishers.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LoggingInterceptor} from '@algoan/nestjs-logging-interceptor';

@Module({
    imports: [AuthModule, BooksModule, AuthorsModule, StylesModule, UsersModule, PublishersModule],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule {
}
