import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateReviewDto {
    @ApiProperty({description: 'Рейтинг книги', example: 5})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    rating: number
    @ApiProperty({description: 'Заголовок отзыва', example: "Типа заголовок"})
    @IsString()
    title: string
    @ApiProperty({description: 'Текст отзыва отзыва', example: "Типа текст"})
    @IsString()
    text: string
    @ApiProperty({description: 'ID книги, для которой пишеться отзыв', example: 1})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    bookId: number
}
