import { ApiProperty } from '@nestjs/swagger';
import * as Joiful from 'joiful';

export class CreateBookDto {
  @ApiProperty({ description: 'Название книги', example: 'Похождения ШаШ' })
  @(Joiful.string().required())
  title: string;

  @ApiProperty({ description: 'Описание книги', example: 'ШаШ ходит' })
  @(Joiful.string().max(250))
  description?: string;

  @ApiProperty({ description: 'ID издателя', example: 1 })
  @(Joiful.number().required())
  publisher: number;

  @ApiProperty({ description: 'Список ID авторов', example: [1] })
  @(Joiful.array().items((joi) => joi.number()))
  authors: number[];

  @ApiProperty({ description: 'Список ID жанров', example: [1] })
  @(Joiful.array().items((joi) => joi.number()))
  styles: number[];
}
