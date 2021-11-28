import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateStyleDto} from './create-style.dto';

export class UpdateStyleDto extends PartialType(CreateStyleDto) {
    @ApiProperty({description: 'ID жанра', example: 1})
    id: number
}
