import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({example: "nickname", description: "Никнейм пользователя"})
    name: string
    @ApiProperty({example: "example@email.com", description: "Почтовый Адрес"})
    email: string
    @ApiProperty({example: "youshallnotpass", description: "Пароль"})
    password: string
}