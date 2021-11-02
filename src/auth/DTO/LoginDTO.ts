import {ApiProperty} from "@nestjs/swagger";

export class LoginDTO {
    @ApiProperty({example: "example@email.com", description: "Почтовый Адрес"})
    email: string
    @ApiProperty({example: "youshallnotpass", description: "Пароль"})
    password: string
}