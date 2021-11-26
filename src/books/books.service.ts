import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {PrismaService} from '../prisma/prisma.service';
import {CreateRealBookDto} from "./dto/create-real-book.dto";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {
    }

    async create(createBookDto: CreateBookDto) {
        const publisher = await this.prisma.publisher.findUnique({
            where: {
                id: createBookDto.publisherId
            }
        })
        if (!publisher) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        const styles = createBookDto.styles.map((id) => ({id}))
        const stylesInDatabase = await this.prisma.style.findMany({
            where: {
                id: {
                    in: createBookDto.styles
                }
            }
        })
        if (stylesInDatabase.length < styles.length) throw new HttpException("Некоторые указанные жанры не существуют", HttpStatus.BAD_REQUEST)
        const authors = createBookDto.authors.map((id) => ({id}))
        const authorsInDatabase = await this.prisma.author.findMany({
            where: {
                id: {
                    in: createBookDto.authors
                }
            }
        })
        if (authorsInDatabase.length < authors.length) throw new HttpException("Некоторые указанные авторы не существуют", HttpStatus.BAD_REQUEST)
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
                    connect: styles,
                },
                authors: {
                    connect: authors,
                },
            },
            include: {
                publisher: true
            }
        });
    }

    async getPage(query) {
        let {available = "all", authorsId = [], stylesId = [], publisherId = 0, page} = query
        let where = {}
        if (available !== "all") {
            where = Object.assign(where, {
                real: {
                    some: {
                        available: {
                            equals: available === "true"
                        }
                    }
                }
            })
        }
        if (authorsId.length > 0) {
            const authors = authorsId.map(str => Number(str))
            where = Object.assign(where, {

            })
        }
        if (stylesId.length > 0) {

        }
        if (publisherId > 0) {

        }

        return await this.prisma.book.findMany({
            where,
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

    async createReal(createRealBookDto: CreateRealBookDto) {

    }

    async removeReal(id: number) {
        return "TODO"
    }
}

function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) === JSON.stringify(a2);
}