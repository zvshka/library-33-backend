import {Injectable} from '@nestjs/common';
import {CreateAuthorDto} from './dto/create-author.dto';
import {UpdateAuthorDto} from './dto/update-author.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) {
    }

    async create(createAuthorDto: CreateAuthorDto) {
        return await this.prisma.author.create({
            data: createAuthorDto
        })
    }

    async findAll() {
        return await this.prisma.author.findMany()
    }

    async findOne(id: number) {
        return await this.prisma.author.findUnique({
            where: {
                id
            },
            include: {
                books: true
            }
        })
    }

    update(id: number, updateAuthorDto: UpdateAuthorDto) {
        return `This action updates a #${id} author`;
    }

    remove(id: number) {
        return `This action removes a #${id} author`;
    }
}
