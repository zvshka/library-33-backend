import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateAuthorDto} from './create-author.dto';
import {IsNumber, IsPositive, IsString, Length} from "class-validator";

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @ApiProperty({
        description: 'ID автора, у которого нужно сделать обновление',
        example: 1,
    })
    @IsNumber({maxDecimalPlaces: 0, allowInfinity: false, allowNaN: false}, {message: "Должно быть целым числом"})
    @IsPositive({message: "Должно быть больше нуля"})
    id: number;

    @ApiProperty({description: 'Новое имя автора', example: 'zvshka2'})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 32, {message: "Минимум 4 символа и максимум 32"})
    name: string;
}
