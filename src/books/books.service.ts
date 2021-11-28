import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {PrismaService} from '../prisma/prisma.service';
import {CreateRealBookDto} from "./dto/create-real-book.dto";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {
    }

    private async checkArr(itemsRaw, db) {
        const items = itemsRaw instanceof Array ? itemsRaw : [itemsRaw]
        const itemsInDatabase = await db.findMany({
            where: {
                id: {
                    in: items
                }
            }
        })
        if (itemsInDatabase.length < items.length) throw new HttpException("Некоторых авторов не существует", HttpStatus.BAD_REQUEST)
        return items
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
        let {available = "all", authorsId, stylesId, publisherId, page} = query
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

        if (authorsId) {
            const authors = await this.checkArr(authorsId, this.prisma.author)
            where = Object.assign(where, {
                authors: {
                    some: {
                        id: {
                            in: authors
                        }
                    }
                }
            })
        }

        if (stylesId) {
            const styles = await this.checkArr(stylesId, this.prisma.style)
            where = Object.assign(where, {
                styles: {
                    some: {
                        id: {
                            in: styles
                        }
                    }
                }
            })
        }
        if (publisherId) {
            const publisher = await this.prisma.publisher.findUnique({
                where: {
                    id: publisherId
                }
            })
            if (!publisher) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
            where = Object.assign(where, {
                publisherId
            })
        }

        return await this.prisma.book.findMany({
            where,
            skip: (page - 1) * 15,
            take: (page) * 15,
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
        const candidate = await this.prisma.book.findUnique({
            where: {
                id: createRealBookDto.bookId
            }
        })
        if (!candidate) throw new HttpException("Книги с таким id не существует", HttpStatus.BAD_REQUEST)
        return await this.prisma.real.create({
            data: createRealBookDto
        })
    }

    async removeReal(id: number) {
        const candidate = await this.prisma.real.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Книги с таким id не существует", HttpStatus.BAD_REQUEST)
        return await this.prisma.real.delete({
            where: {
                id
            }
        })
    }
}