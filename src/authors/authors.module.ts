import {forwardRef, Module} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import {PrismaService} from "../prisma/prisma.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, PrismaService],
  imports: [
    forwardRef(() => AuthModule)
  ],
})
export class AuthorsModule {}
