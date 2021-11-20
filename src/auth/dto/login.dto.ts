import { ApiProperty } from '@nestjs/swagger';
import {IsString, Length} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'nickname', description: 'Username' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 20, {message: "Не может быть пустым и не может превышать 20 символов"})
  username: string;

  @ApiProperty({ example: 'youshallnotpass', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 30, {message: "Не может быть пустым и не может превышать 30 символов"})
  password: string;
}
