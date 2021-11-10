import { ApiProperty } from "@nestjs/swagger";
import * as Joiful from "joiful";

export class RegisterDto {
  @ApiProperty({ example: "nickname", description: "Никнейм пользователя" })
  @Joiful.string().required().min(4)
  name: string;

  @ApiProperty({ example: "example@email.com", description: "Почтовый Адрес" })
  @Joiful.string().email().required()
  email: string;

  @ApiProperty({ example: "youshallnotpass", description: "Пароль" })
  @Joiful.string().required().min(8)
  password: string;

  @ApiProperty({ example: "Andrey", description: "Имя" })
  @Joiful.string()
  firstName?: string;

  @ApiProperty({ example: "Pushpurs", description: "Фамилия" })
  @Joiful.string()
  lastName?: string;
}