import {ApiProperty} from "@nestjs/swagger";

export class CreateAuthorDto {
    @ApiProperty({example: "zvshka", description: "Имя/Название автора"})
    name: string
}
