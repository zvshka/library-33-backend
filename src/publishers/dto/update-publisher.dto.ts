import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreatePublisherDto} from './create-publisher.dto';

export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {
    @ApiProperty({description: 'Название издателя', example: "Привет"})
    name?: string
    @ApiProperty({description: 'Адрес издателя', example: "Москва"})
    address?: string
}
