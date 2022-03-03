import {Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {PrismaService} from "../prisma/prisma.service";
import {add} from "date-fns"

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {
    }
    create(user, createOrderDto: CreateOrderDto) {
        return this.prisma.order.create({
            data: {
                userId: user.id,
                realId: createOrderDto.realId,
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
