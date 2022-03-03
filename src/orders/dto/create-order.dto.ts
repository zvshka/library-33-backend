import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class CreateOrderDto {
    @ApiProperty({description: 'ID книги', example: 1})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    bookId: number
}
