import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/entities/user.entity";

@Injectable()
export class TokensService {
    constructor(private prisma: PrismaService,
                private jwtService: JwtService) {
    }

    async findToken(refreshToken) {
        return await this.prisma.token.findUnique({
            where: {
                refreshToken
            }
        })
    }

    validateAccessToken(accessToken) {
        return this.jwtService.verify(accessToken)
    }

    validateRefreshToken(refreshToken) {
        return this.jwtService.verify(refreshToken, {
            secret: process.env.JWT_REFRESH_SECRET
        })
    }

    generateToken(user: User) {
        const payload = {email: user.email, id: user.id, role: user.role, name: user.name}
        const accessToken = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, {secret: process.env.JWT_REFRESH_SECRET, expiresIn: "30d"})
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.prisma.token.findUnique({
            where: {
                userId
            }
        })
        if (tokenData) {
            return await this.prisma.token.update({
                where: {
                    userId
                },
                data: {
                    refreshToken
                }
            })
        }
        return await this.prisma.token.create({
            data: {
                userId,
                refreshToken
            }
        })
    }
}
