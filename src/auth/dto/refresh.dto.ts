import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    description:
      'refreshToken, который можно получить после входа или регистрации',
  })
  @IsString({ message: 'Должно быть строкой и содержать refreshToken' })
  refreshToken: string;
}
