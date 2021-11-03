import {ApiProperty} from "@nestjs/swagger";

export class UpdateInfoDTO {
    @ApiProperty({example: "nickname", description: "Никнейм пользователя"})
    name?: string
    @ApiProperty({example: "example@email.com", description: "Почтовый Адрес"})
    email?: string
    @ApiProperty({example: "Andrey", description: "Имя пользователя"})
    firstName?: string
    @ApiProperty({example: "Pushpurs", description: "Фамилия пользователя"})
    lastName?: string
}