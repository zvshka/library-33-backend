import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'example@email.com', description: 'Почтовый Адрес' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Не корректный Email' })
  @Length(1, 40, {message: "Не может быть пустым и не может превышать 40 символов"})
  email: string;

  @ApiProperty({ example: 'nickname', description: 'Никнейм пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 20, { message: 'Не меньше 4 и не больше 20 символов' })
  username: string;

  @ApiProperty({ example: 'youshallnotpass', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 30, { message: 'Не меньше 4 и не больше 30 символов' })
  password: string;

  @ApiProperty({ example: 'Andrey', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  firstName?: string;

  @ApiProperty({ example: 'Pushpurs', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  lastName?: string;
}
