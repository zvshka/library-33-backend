import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {UpdateDto} from './dto/update.dto';
import {UserEntity} from './entities/user.entity';
import {LikeBookDto} from "./dto/likeBook.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async create(data) {
        return await this.prisma.user.create({
            data,
        });
    }

    async findByUsername(username) {
        return await this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async aboutMe(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return new UserEntity(user);
    }

    async updateMe(userId, updateDto: UpdateDto) {
        const updated = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: updateDto,
        });
        return new UserEntity(updated);
    }

    async getLikedBooks(user) {
        return this.prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                likedBooks: true
            }
        })
    }

    async likeBook(user: UserEntity, likeBookDto: LikeBookDto) {
        const candidate = await this.prisma.book.findUnique({
            where: {
                id: likeBookDto.id
            },
        })
        if (!candidate) throw new HttpException("Книги с таким id не существует", HttpStatus.BAD_REQUEST)
        return await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                likedBooks: {
                    connect: {
                        id: likeBookDto.id
                    }
                }
            },
            select: {
                likedBooks: true
            }
        })
    }

    async unlikeBook(user: UserEntity, likeBookDto: LikeBookDto) {
        const userData = await this.prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                likedBooks: true
            }
        })
        const candidate = await this.prisma.book.findUnique({
            where: {
                id: likeBookDto.id
            },
        })
        if (!candidate) throw new HttpException("Книги с таким id не существует", HttpStatus.BAD_REQUEST)
        if (!userData.likedBooks.some(book => book.id !== likeBookDto.id)) throw new HttpException("Книги с таким id в понравившихся не существует", HttpStatus.BAD_REQUEST)
        return await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                likedBooks: {
                    disconnect: {
                        id: likeBookDto.id
                    }
                }
            },
            select: {
                likedBooks: true
            }
        })
    }
}
