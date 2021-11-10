import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {PrismaService} from './prisma/prisma.service';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "./auth/validation.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("Library 33 Backend (Nest.js version)")
        .setDescription("Документация backend'а сайта Library 33")
        .setVersion("1.0.0")
        .addTag("Library 33")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config, {
        extraModels: []
    })
    SwaggerModule.setup("/api-docs", app, document)

    const prismaService: PrismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app)
    await app.listen(3000);
}

bootstrap();
