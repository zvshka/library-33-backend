import {forwardRef, Module} from '@nestjs/common';
import {PublishersService} from './publishers.service';
import {PublishersController} from './publishers.controller';
import {AuthModule} from "../auth/auth.module";
import {PrismaService} from "../prisma/prisma.service";

@Module({
    controllers: [PublishersController],
    providers: [PublishersService, PrismaService],
    imports: [
        forwardRef(() => AuthModule)
    ]
})
export class PublishersModule {
}
