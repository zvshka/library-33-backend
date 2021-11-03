import {Injectable} from '@nestjs/common';
import {CreateStyleDto} from './dto/create-style.dto';
import {UpdateStyleDto} from './dto/update-style.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class StylesService {

    constructor(private prisma: PrismaService) {
    }

    async create(createStyleDto: CreateStyleDto) {
        return await this.prisma.style.create({
            data: createStyleDto
        })
    }

    findAll() {
        return `This action returns all styles`;
    }

    findOne(id: number) {
        return `This action returns a #${id} style`;
    }

    update(id: number, updateStyleDto: UpdateStyleDto) {
        return `This action updates a #${id} style`;
    }

    remove(id: number) {
        return `This action removes a #${id} style`;
    }
}
