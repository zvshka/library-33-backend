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
                        id: createBookDto.publisher,
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

    async findAll() {
        return await this.prisma.book.findMany({
            include: {
                publisher: true,
                authors: true,
                styles: true,
            },
        });
    }

    async findOne(id: number) {
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
        let book = await this.prisma.book.findUnique({
            where: {
                id
            },
            include: {
                styles: {
                    select: {
                        id: true
                    },
                },
                authors: {
                    select: {
                        id: true
                    },
                }
            }
        })
        book.styles.map(({id}) => id)
        book.authors.map(({id}) => id)
        if (!book) throw new HttpException("Нет такой книги", HttpStatus.BAD_REQUEST)
        console.log(book)
        // if (!arraysEqual(book.styles, updateBookDto.styles))
        // await this.prisma.book.update({
        //     where: {
        //         id
        //     },
        //     data: {}
        // })
    }

    remove(id: number) {
        return `This action removes a #${id} book`;
    }
}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) === JSON.stringify(a2);
}