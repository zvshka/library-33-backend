import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async createUser(data: Prisma.UserCreateInput) {
        return await this.prisma.user.create({
            data
        })
    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async getAll() {
        return await this.prisma.user.findMany()
    }
}
