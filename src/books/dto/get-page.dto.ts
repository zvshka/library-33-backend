import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsEnum, IsNumber, IsNumberString, IsPositive, Min} from "class-validator";
import {Transform, Type} from "class-transformer";

enum available {
    all = "all",
    true = "true",
    false = "false"
}

export class GetPageDto {
    @ApiProperty({description: 'Номер страницы', example: 1})
    @Type(() => Number)
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @IsPositive()
    page: number

    @ApiProperty({description: 'ID издателя', example: 1, required: false})
    @Type(() => Number)
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @IsPositive()
    publisherId?: number

    @ApiProperty({description: 'Список ID жанров', example: [1], required: false})
    @Type(() => Number)
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0}, {each: true})
    @IsPositive({each: true})
    stylesId?: number[]

    @ApiProperty({description: 'Список ID авторов', example: [1], required: false})
    @Type(() => Number)
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0}, {each: true})
    @IsPositive({each: true})
    authorsId?: number[]

    @ApiProperty({description: "Наличие, по умолчанию будет all", example: "all", required: false})
    @IsEnum(available)
    available?: available
}