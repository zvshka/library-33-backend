import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreatePublisherDto} from './create-publisher.dto';

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {
    @ApiProperty({description: 'ID издателя', example: 1})
    id: number
}
