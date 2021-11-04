import {Injectable} from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) {
    }

    async create(createBookDto: CreateBookDto) {
        return await this.prisma.book.create({
            data: {
                title: createBookDto.title,
                publisher: {
                    connect: {
                        id: createBookDto.publisher
                    }
                },
                styles: {
                    connect: [
                        ...createBookDto.styles.map(id => ({id}))
                    ]
                },
                authors: {
                    connect: [
                        ...createBookDto.authors.map(id => ({id}))
                    ]
                }
            }
        })
    }

    async findAll() {
        return await this.prisma.book.findMany({
            include: {
                publisher: true,
                authors: true,
                styles: true
            }
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} book`;
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        return `This action updates a #${id} book`;
    }

    remove(id: number) {
        return `This action removes a #${id} book`;
    }
}
