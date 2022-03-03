import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {PrismaService} from "../prisma/prisma.service";
import {add} from "date-fns"

function findDifference(arr1, arr2) {
    return arr1.filter(x => !arr2.includes(x));
}

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {
    }

    async create(user, createOrderDto: CreateOrderDto) {
        const bookData = await this.prisma.book.findUnique({
            where: {
                id: createOrderDto.bookId
            },
            select: {
                real: true
            }
        })

        const inUse = await this.prisma.order.findMany({
            where: {
                OR: [{status: "IN_USE"}, {status: "AWAITS"}],
                realId: {
                    in: bookData.real.map(r => r.id)
                }
            }
        })

        const inUseIds = inUse.map(d => d.realId)
        const realIds = bookData.real.map(d => d.id)

        const diff = findDifference(realIds, inUseIds)

        if (diff.length < 1) throw new HttpException("Нет доступных копий книг", HttpStatus.BAD_REQUEST)

        return this.prisma.order.create({
            data: {
                userId: user.id,
                realId: diff[0],
                return_date: add(Date.now(), {days: 7})
            }
        })
    }

    findAll() {
        return this.prisma.order.findMany()
    }

    findOne(id: number) {
        return this.prisma.order.findUnique({
            where: {
                id
            }
        })
    }


    update(id: number, updateOrderDto) {
        return this.prisma.order.update({
            where: {
                id
            },
            data: updateOrderDto
        })
    }


    remove(id: number) {
        return this.prisma.order.delete({
            where: {
                id
            }
        })
    }

}
