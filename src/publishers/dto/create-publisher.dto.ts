import {ApiProperty} from '@nestjs/swagger';

export class CreatePublisherDto {
    @ApiProperty({description: 'Название издателя', example: 'OldButGoldBooks'})
    name: string;
    @ApiProperty({description: "Адрес издательства", example: "Москва, ул. Горького, дом 11"})
    address: string
}
