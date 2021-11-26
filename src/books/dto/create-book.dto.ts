import {ApiProperty} from '@nestjs/swagger';
import {ArrayMinSize, IsArray, IsNumber, IsPositive, IsString, Length, ValidateNested} from "class-validator";

export class CreateBookDto {
    @ApiProperty({description: 'Название книги', example: 'Похождения ШаШ'})
    @IsString({message: "Должно быть строкой"})
    @Length(8, 70, {message: "Минимум 8 символов и максимум 70"})
    title: string;

    @ApiProperty({description: 'Описание книги', example: 'ШаШ ходит'})
    @IsString({message: "Должно быть строкой"})
    @Length(0, 250, {message: "Максимум 250 символов"})
    description?: string;

    @ApiProperty({description: 'ID издателя', example: 1})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @IsPositive()
    publisherId: number;

    @ApiProperty({description: 'Список ID авторов', example: [1]})
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, {each: true})
    @IsPositive({each: true})
    authors: number[];

    @ApiProperty({description: 'Список ID жанров', example: [1]})
    @IsArray()
    @ArrayMinSize(1)
    @IsNumber({}, {each: true})
    @IsPositive({each: true})
    styles: number[];
}
