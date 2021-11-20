import { ApiProperty } from '@nestjs/swagger';
import {IsString, Length} from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({ example: 'zvshka', description: 'Имя/Название автора' })
  @IsString({message: "Должно быть строкой"})
  @Length(4, 32, {message: "Минимум 4 символа, максимум 32"})
  name: string;
}
