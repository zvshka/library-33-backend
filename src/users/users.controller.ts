import {Body, ClassSerializerInterceptor, Controller, Get, Patch, UseInterceptors,} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {UserEntity} from './entities/user.entity';
import {User} from '../auth/decorators/user.decorator';
import {Auth} from '../auth/decorators/auth.decorator';
import {UpdateDto} from './dto/update.dto';
import {ADMIN} from "../auth/decorators/roles-auth.decorator";

@ApiTags("Пользователь")
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
