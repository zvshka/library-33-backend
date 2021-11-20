import { ApiProperty } from '@nestjs/swagger';
import {IsString, Length} from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    description:
      'refreshToken, который можно получить после входа или регистрации',
  })
  @IsString({ message: 'Должно быть строкой и содержать refreshToken' })
  @Length(1, 255, {message: "Не может быть пустым"})
  refreshToken: string;
}
