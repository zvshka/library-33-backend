import {ApiProperty} from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({description: "Название книги", example: "Похождения ШаШ"})
    title: string
    @ApiProperty({description: "Описание книги", example: "ШаШ ходит"})
    description?: string
    @ApiProperty({description: "ID издателя", example: 1})
    publisher: number
    @ApiProperty({description: "Список ID авторов", example: [1]})
    authors: number[]
    @ApiProperty({description: "Список ID жанров", example: [1]})
    styles: number[]
}
