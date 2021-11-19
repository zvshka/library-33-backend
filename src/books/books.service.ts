import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

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
          connect: [...createBookDto.styles.map((id) => ({ id }))],
        },
        authors: {
          connect: [...createBookDto.authors.map((id) => ({ id }))],
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
      where: { id },
      include: {
        real: true,
        reviews: true,
        authors: true,
        styles: true,
      },
    });
    if (!book)
      throw new HttpException('Нет такой книги', HttpStatus.BAD_REQUEST);
    else return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
