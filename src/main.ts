import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {PrismaService} from './prisma/prisma.service';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
// import { PrismaSessionStore } from '@quixo3/prisma-session-store';
// import * as session from 'express-session';
// import {ValidationPipe} from './auth/pipes/valiadtion.pipe';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Library 33 Backend (Nest.js version)')
        .setDescription("Документация backend'а сайта Library 33")
        .setVersion('1.0.0')
        .addTag('Library 33')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [],
    });
    SwaggerModule.setup('/api-docs', app, document);

    const prismaService: PrismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    app.useGlobalPipes(new ValidationPipe({transform: true, skipMissingProperties: true}));
    app.enableCors({
        // origin: ['http://localhost:3000', 'http://localhost:5000'],
        origin: "https://library-33.herokuapp.com",
        credentials: true,
    });

    await app.listen(process.env.PORT);
}

bootstrap();
