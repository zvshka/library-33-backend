import {ApiProperty} from '@nestjs/swagger';
import {IsString, Length} from "class-validator";

export class CreateStyleDto {
    @ApiProperty({description: 'Название жанра', example: 'Фантастика'})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 40, {message: "Не меньше 4 и не больше 40 символов"})
    name: string;

    @ApiProperty({description: 'Название жанра', example: 'Фантастика'})
    @IsString({message: "Должно быть строкой"})
    @Length(0, 255, {message: "Максимум 255 символов"})
    description?: string
}
