import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { StylesModule } from './styles/styles.module';
import { UsersModule } from './users/users.module';
import { PublishersModule } from './publishers/publishers.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { ReviewsModule } from './reviews/reviews.module';
import { OffencesModule } from './offences/offences.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AuthModule,
    BooksModule,
    AuthorsModule,
    StylesModule,
    UsersModule,
    PublishersModule,
    ReviewsModule,
    OffencesModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
