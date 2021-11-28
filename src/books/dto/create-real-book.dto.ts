import {ApiProperty} from "@nestjs/swagger";

export class CreateRealBookDto {
    @ApiProperty({description: 'ID книги, для которой создается экземпляр', example: 1})
    bookId: number
}
