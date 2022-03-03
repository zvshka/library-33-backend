import {forwardRef, Module} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {OrdersController} from './orders.controller';
import {PrismaService} from "../prisma/prisma.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, PrismaService],
    imports: [forwardRef(() => AuthModule)]
})
export class OrdersModule {
}
