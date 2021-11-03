import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import {PrismaService} from "../prisma/prisma.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [StylesController],
  providers: [StylesService, PrismaService],
  imports: [AuthModule]
})
export class StylesModule {}
