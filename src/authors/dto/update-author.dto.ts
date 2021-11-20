import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateAuthorDto} from './create-author.dto';
import {IsNumber, IsPositive, IsString, Length} from "class-validator";

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @ApiProperty({description: 'Новое имя автора', example: 'zvshka2'})
    @IsString({message: "Должно быть строкой"})
    @Length(0, 70, {message: "Максимум 70 символов"})
    name?: string

    @ApiProperty({description: 'Новое описание автора', example: 'Писатель в жанре фантастики'})
    @IsString({message: "Должно быть строкой"})
    @Length(0, 70, {message: "Максимум 70 символов"})
    description?: string;
}
