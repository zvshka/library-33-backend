import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsPositive} from "class-validator";

export class LikeBookDto {
    @ApiProperty({description: 'id книги', example: 1})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @IsPositive()
    id: number
}