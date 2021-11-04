import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @ApiProperty({description: "ID автора, у которого нужно сделать обновление", example: 1})
    id: number
    @ApiProperty({description: "Новое имя автора", example: "zvshka2"})
    name: string
}
