import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateDto } from "./dto/update.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async create(data) {
    return await this.prisma.user.create({
      data
    });
  }

  async findByEmail(email) {
    return await this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async findById(userId) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async aboutMe(userId) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    delete user.secret;
    delete user.password;

    return user;
  }

  async updateMe(userId, updateDto: UpdateDto) {
    const updated = await this.prisma.user.update({
      where: {
        id: userId
      },
      data: updateDto
    });

    delete updated.secret;
    delete updated.password;

    return updated;
  }
}
