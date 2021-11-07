import {ApiProperty} from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({example: "nickname", description: "Никнейм пользователя"})
    name: string
    @ApiProperty({example: "example@email.com", description: "Почтовый Адрес"})
    email: string
    @ApiProperty({example: "youshallnotpass", description: "Пароль"})
    password: string
    @ApiProperty({example: "Andrey", description: "Имя"})
    firstName?: string
    @ApiProperty({example: "Pushpurs", description: "Фамилия"})
    lastName?: string
}