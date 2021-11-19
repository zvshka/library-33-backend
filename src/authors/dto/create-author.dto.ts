import { ApiProperty } from '@nestjs/swagger';
import * as Joiful from 'joiful';

export class CreateAuthorDto {
  @ApiProperty({ example: 'zvshka', description: 'Имя/Название автора' })
  @(Joiful.string().required())
  name: string;
}
