import { forwardRef, HttpException, HttpStatus, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { TokensService } from './services/tokens.service';

@Module({
  providers: [AuthService, PrismaService, TokensService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [AuthService, TokensService, JwtModule],
})
export class AuthModule {}
