import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateAuthorDto} from './dto/create-author.dto';
import {UpdateAuthorDto} from './dto/update-author.dto';
import {PrismaService} from '../prisma/prisma.service';
import {AuthorEntity} from "./entities/author.entity";

@Injectable()
export class AuthorsService {
    constructor(private prisma: PrismaService) {
    }

    async create(createAuthorDto: CreateAuthorDto) {
        return await this.prisma.author.create({
            data: createAuthorDto,
        });
    }

    async findAll() {
        return await this.prisma.author.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.author.findUnique({
            where: {
                id,
            },
            include: {
                books: true,
            },
        });
    }

    async update(id: number, updateAuthorDto: UpdateAuthorDto) {
        let author = await this.prisma.author.findUnique({
            where: {
                id
            }
        })
        if (!author) throw new HttpException("Автора с таким id не существует", HttpStatus.BAD_REQUEST)
        if (updateAuthorDto.name?.length > 0) author.name = updateAuthorDto.name
        if (updateAuthorDto.description?.length > 0) author.description = updateAuthorDto.description
        return await this.prisma.author.update({
            where: {
                id
            },
            data: author
        })
    }

    async remove(id: number) {
        let author = await this.prisma.author.findUnique({
            where: {
                id
            }
        })
        if (!author) throw new HttpException("Автора с таким id не существует", HttpStatus.BAD_REQUEST)
        return await this.prisma.author.delete({
            where: {
                id
            }
        })
    }
}
