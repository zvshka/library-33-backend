import {ApiProperty} from "@nestjs/swagger";

export class UserDTO {
    @ApiProperty({example: 0, description: "ID пользователя"})
    id:number
    @ApiProperty({example: "nickname", description: "Никнейм пользователя"})
    name: string
    @ApiProperty({example: "example@email.com", description: "Почтовый Адрес"})
    email: string
    @ApiProperty({example: "youshallnotpass", description: "Пароль"})
    password: string
    @ApiProperty({example: "Andrey", description: "Имя пользователя"})
    firstName?: string
    @ApiProperty({example: "Pushpurs", description: "Фамилия пользователя"})
    lastName?: string
    @ApiProperty({example: "USER", description: "Роль пользователя"})
    role: string
}