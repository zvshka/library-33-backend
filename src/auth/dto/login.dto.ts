import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import * as Joiful from "joiful";

export class LoginDto {
  @ApiProperty({ example: "example@email.com", description: "Почтовый Адрес" })
  @Joiful.string().email().required()
  email: string;

  @ApiProperty({ example: "youshallnotpass", description: "Пароль" })
  @Joiful.string().required()
  password: string;
}