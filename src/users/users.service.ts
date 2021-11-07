import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async create(data) {
        return await this.prisma.user.create({
            data
        })
    }

    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async findById(userId) {
        return await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async aboutMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                orders: true,
                likedBooks: true,
                reviews: true,
                offences: true
            }
        })
        delete user.secret
        delete user.password
        return user
    }
}
