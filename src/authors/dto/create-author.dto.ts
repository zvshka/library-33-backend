import {ApiProperty} from '@nestjs/swagger';
import {IsString, Length} from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({example: 'zvshka', description: 'Имя/Название автора'})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 70, {message: "Минимум 4 символа, максимум 70"})
    name: string
    @ApiProperty({example: 'Амбициозный писатель романов', description: 'Краткое описание автора'})
    @IsString({message: "Должно быть строкой"})
    @Length(0, 255, {message: "Минимум 4 символа, максимум 32"})
    description?: string
}
