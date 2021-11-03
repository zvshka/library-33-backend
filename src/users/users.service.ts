import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "./entities/user.entity";

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

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }
}
