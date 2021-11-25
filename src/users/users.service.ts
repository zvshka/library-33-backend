import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {UpdateDto} from './dto/update.dto';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async create(data) {
        return await this.prisma.user.create({
            data,
        });
    }

    async findByUsername(username) {
        return await this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async aboutMe(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return new UserEntity(user);
    }

    async updateMe(userId, updateDto: UpdateDto) {
        const updated = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: updateDto,
        });
        return new UserEntity(updated);
    }
}
