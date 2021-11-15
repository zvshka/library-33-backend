import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class RegisterDto {
    @ApiProperty({example: "example@email.com", description: "Почтовый Адрес"})
    // @Joiful.string().email().required()
    @IsString({message: "Должно быть строкой"})
    @IsEmail({}, {message: "Не корректный Email"})
    email: string;

    @ApiProperty({example: "nickname", description: "Никнейм пользователя"})
    // @Joiful.string().required().min(4)
    @IsString({message: "Должно быть строкой"})
    @Length(4, 20, {message: "Не меньше 4 и не больше 20 символов"})
    username: string;

    @ApiProperty({example: "youshallnotpass", description: "Пароль"})
    // @Joiful.string().required().min(8)
    @IsString({message: "Должно быть строкой"})
    @Length(4, 24, {message: "Не меньше 4 и не больше 24 символов"})
    password: string;

    @ApiProperty({example: "Andrey", description: "Имя"})
        // @Joiful.string()
    @IsString({message: "Должно быть строкой"})
    firstName?: string;

    @ApiProperty({example: "Pushpurs", description: "Фамилия"})
        // @Joiful.string()
    @IsString({message: "Должно быть строкой"})
    lastName?: string;
}