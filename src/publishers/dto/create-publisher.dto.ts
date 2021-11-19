import { ApiProperty } from '@nestjs/swagger';

export class CreatePublisherDto {
  @ApiProperty({ description: 'Название издателя', example: 'OldButGoldBooks' })
  name: string;
}
