import {forwardRef, Module} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import {PrismaService} from "../prisma/prisma.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
  imports: [forwardRef(() => AuthModule)]
})
export class ReviewsModule {}
