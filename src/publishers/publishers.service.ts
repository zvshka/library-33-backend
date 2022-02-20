import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePublisherDto} from './dto/create-publisher.dto';
import {UpdatePublisherDto} from './dto/update-publisher.dto';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class PublishersService {
    constructor(private prisma: PrismaService) {
    }

    async create(createPublisherDto: CreatePublisherDto) {
        return await this.prisma.publisher.create({
            data: createPublisherDto,
        });
    }

    async findAll() {
        return await this.prisma.publisher.findMany();
    }

    async findOne(id: number) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.publisher.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return candidate
    }

    async update(id: number, updatePublisherDto: UpdatePublisherDto) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.publisher.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return await this.prisma.publisher.update({
            where: {
                id
            },
            data: {
                ...updatePublisherDto
            }
        })
    }

    async remove(id: number) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.publisher.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return await this.prisma.publisher.delete({
            where: {
                id
            }
        })
    }
}
