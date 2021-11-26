import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsEnum, IsNumber, IsPositive} from "class-validator";

enum available {
    all = "all",
    true = "true",
    false = "false"
}

export class GetPageDto {
    @ApiProperty({description: 'Номер страницы', example: 1})
    // @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    // @IsPositive()
    page: number

    @ApiProperty({description: 'ID издателя', example: 1})
    // @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    // @IsPositive()
    publisherId?: number

    @ApiProperty({description: 'Список ID жанров', example: [1]})
    // @IsArray()
    // @IsNumber({}, {each: true})
    // @IsPositive({each: true})
    stylesId?: number[]

    @ApiProperty({description: 'Список ID авторов', example: [1]})
    // @IsArray()
    // @IsNumber({}, {each: true})
    // @IsPositive({each: true})
    authorsId?: number[]

    @ApiProperty({description: "Наличие, по умолчанию будет all", example: "all"})
    @IsEnum(available)
    available?: "all" | "true" | "false"
}