import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User as UserEntity } from "./entities/user.entity";
import { User } from "../auth/user.decorator";
import { Auth } from "../auth/auth.decorator";
import { UpdateDto } from "./dto/update.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({
    summary: "Обновить информацию о себе",
    security: [{ bearer: [] }],
    tags: ["Пользователь"]
  })
  @Auth()
  @Patch("/@me")
  updateMe(@User() user: UserEntity, @Body() updateDto: UpdateDto) {
    return this.usersService.updateMe(user.id, updateDto);
  }

  @ApiOperation({
    summary: "Получить подробную информацию о себе",
    security: [{ bearer: [] }],
    tags: ["Пользователь"]
  })
  @Auth()
  @Get("/@me/")
  aboutMe(@User() user: UserEntity) {
    return this.usersService.aboutMe(user.id);
  }

  @ApiOperation({
    summary: "Получить всех пользователей",
    security: [{ bearer: [] }],
    tags: ["Пользователь"]
  })
  @ApiResponse({
    type: [UserEntity]
  })
  @Auth("ADMIN")
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
