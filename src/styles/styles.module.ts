import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [StylesController],
  providers: [StylesService, PrismaService, UsersService],
  imports: [AuthModule],
})
export class StylesModule {}
