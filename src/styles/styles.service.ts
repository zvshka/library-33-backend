import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateStyleDto} from './dto/create-style.dto';
import {UpdateStyleDto} from './dto/update-style.dto';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class StylesService {
    constructor(private prisma: PrismaService) {
    }

    async create(createStyleDto: CreateStyleDto) {
        return await this.prisma.style.create({
            data: createStyleDto,
        });
    }

    async findAll() {
        return await this.prisma.style.findMany();
    }

    async findOne(id: number) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.style.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return candidate
    }

    async update(id: number, updateStyleDto: UpdateStyleDto) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.style.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return `This action updates a #${id} style`;
    }

    async remove(id: number) {
        if (isNaN(id)) throw new HttpException("id не является числом", HttpStatus.BAD_REQUEST)
        if (id < 1) throw new HttpException("id не может быть меньше 1", HttpStatus.BAD_REQUEST)
        const candidate = await this.prisma.style.findUnique({
            where: {
                id
            }
        })
        if (!candidate) throw new HttpException("Нет такого издателя", HttpStatus.BAD_REQUEST)
        return this.prisma.style.delete({
            where: {
                id
            }
        })
    }
}
