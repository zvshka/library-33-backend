import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {
    }

    async create(createBookDto: CreateBookDto) {
        return await this.prisma.book.create({
            data: {
                title: createBookDto.title,
                description: createBookDto.description,
                publisher: {
                    connect: {
                        id: createBookDto.publisherId,
                    },
                },
                styles: {
                    connect: [...createBookDto.styles.map((id) => ({id}))],
                },
                authors: {
                    connect: [...createBookDto.authors.map((id) => ({id}))],
                },
            },
        });
    }

    async findAll(page) {
        return await this.prisma.book.findMany({
            select: {
                id: true,
                publisher: true,
                authors: true,
                styles: true,
            }
        });
    }

    async findOne(id: number) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const book = await this.prisma.book.findUnique({
            where: {
                id
            },
            include: {
                real: true,
                reviews: true,
                authors: true,
                styles: true,
            },
        });
        if (!book) throw new HttpException('Нет такой книги', HttpStatus.BAD_REQUEST);
        else return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.book.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return "TODO"
    }

    async remove(id: number) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.book.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return this.prisma.book.delete({
            where: {
                id
            }
        })
    }
}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) === JSON.stringify(a2);
}