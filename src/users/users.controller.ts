import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Patch, Post, UseInterceptors,} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserEntity} from './entities/user.entity';
import {User} from '../auth/decorators/user.decorator';
import {Auth} from '../auth/decorators/auth.decorator';
import {UpdateDto} from './dto/update.dto';
import {LikeBookDto} from "./dto/likeBook.dto";
import {ADMIN} from "../auth/decorators/roles-auth.decorator";

@ApiTags("Пользователи")
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @ApiOperation({
        summary: 'Обновить информацию о себе',
        security: [{bearer: []}],
    })
    @Auth()
    @Patch('/@me')
    updateMe(@User() user: UserEntity, @Body() updateDto: UpdateDto) {
        return this.usersService.updateMe(user.id, updateDto);
    }

    @ApiOperation({
        summary: 'Обновить информацию о себе',
        security: [{bearer: []}],
    })
    @Auth()
    @Get('/@me/likedBooks')
    getLikedBooks(@User() user: UserEntity) {
        return this.usersService.getLikedBooks(user)
    }

    @ApiOperation({
        summary: 'Удалить книгу из понравившиеся',
        security: [{bearer: []}],
    })
    @Auth()
    @Delete('/@me/likedBooks')
    unlikeBook(@User() user: UserEntity, @Body() likeBookDto: LikeBookDto) {
        return this.usersService.unlikeBook(user, likeBookDto)
    }

    @ApiOperation({
        summary: 'Добавить книгу в понравившиеся',
        security: [{bearer: []}],
    })
    @Auth()
    @Post('/@me/likedBooks')
    likeBook(@User() user: UserEntity, @Body() likeBookDto: LikeBookDto) {
        return this.usersService.likeBook(user, likeBookDto)
    }

    @ApiOperation({
        summary: 'Получить подробную информацию о себе',
        security: [{bearer: []}],
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/@me/')
    @Auth()
    aboutMe(@User() user): Promise<UserEntity> {
        return this.usersService.aboutMe(user.id);
    }

    @ApiOperation({
        summary: 'Получить всех пользователей',
        security: [{bearer: []}],
    })
    @ApiResponse({
        type: [UserEntity],
    })
    @Auth(ADMIN)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
