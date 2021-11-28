import {ApiProperty} from '@nestjs/swagger';

export class UpdateDto {
    @ApiProperty({description: 'Имя пользователя', example: 'Andrey'})
    firstName: string;
    @ApiProperty({description: 'Фамилия пользователя', example: 'Pushpurs'})
    lastName: string;
}
