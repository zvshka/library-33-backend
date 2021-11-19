import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'nickname', description: 'Username' })
  @IsString({ message: 'Должно быть строкой' })
  username: string;

  @ApiProperty({ example: 'youshallnotpass', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  password: string;
}
