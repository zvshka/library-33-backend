import {ApiProperty} from '@nestjs/swagger';
import {IsString, Length} from "class-validator";

export class CreatePublisherDto {
    @ApiProperty({description: 'Название издателя', example: 'OldButGoldBooks'})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 120, {message: "Не меньше 4 и не больше 120 символов"})
    name: string;
    @ApiProperty({description: "Адрес издательства", example: "Москва, ул. Горького, дом 11"})
    @IsString({message: "Должно быть строкой"})
    @Length(0, 70, {message: "Не больше 70 символов"})
    address?: string
}
