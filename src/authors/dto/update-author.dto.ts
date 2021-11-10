import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';
import * as Joiful from "joiful";

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @ApiProperty({description: "ID автора, у которого нужно сделать обновление", example: 1})
    @Joiful.number().required()
    id: number

    @ApiProperty({description: "Новое имя автора", example: "zvshka2"})
    @Joiful.string().required()
    name: string
}
