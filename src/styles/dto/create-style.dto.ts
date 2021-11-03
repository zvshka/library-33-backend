import {ApiProperty} from "@nestjs/swagger";

export class CreateStyleDto {
    @ApiProperty({description: "Название жанра", example: "Фантастика"})
    name: string
}
