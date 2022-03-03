import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateReviewDto} from './dto/create-review.dto';
import {UpdateReviewDto} from './dto/update-review.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) {
    }

    create(user, createReviewDto: CreateReviewDto) {
        return this.prisma.review.create({
            data: {
                userId: user.id,
                ...createReviewDto
            }
        })
    }

    findAll() {
        return this.prisma.review.findMany()
    }

    findOne(id: number) {
        return `This action returns a #${id} review`;
    }

    async update(id: number, updateReviewDto: UpdateReviewDto, user) {
        const candidate = await this.prisma.review.findUnique({
            where: {id}
        })
        if (user.id !== candidate.userId && user.role !== "ADMIN") throw new HttpException("Вы не можете изменить этот отзыв", HttpStatus.BAD_REQUEST)
        return this.prisma.review.update({
            where: {id},
            data: updateReviewDto
        })
    }

    async remove(id: number, user) {
        const candidate = await this.prisma.review.findUnique({
            where: {id}
        })
        if (user.id !== candidate.userId && user.role !== "ADMIN") throw new HttpException("Вы не можете удалить этот отзыв", HttpStatus.BAD_REQUEST)
        return this.prisma.review.delete({
            where: {id}
        })
    }
}
