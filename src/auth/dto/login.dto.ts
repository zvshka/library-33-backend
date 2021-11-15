import {ApiProperty} from "@nestjs/swagger";
import * as Joiful from "joiful";

export class LoginDto {
    @ApiProperty({example: "nickname", description: "Username"})
    @Joiful.string().required()
    username: string;

    @ApiProperty({example: "youshallnotpass", description: "Пароль"})
    @Joiful.string().required()
    password: string;
}