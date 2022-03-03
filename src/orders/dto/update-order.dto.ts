import {ApiProperty} from '@nestjs/swagger';

enum status {
    IN_USE,
    AWAITS,
    DONE,
    CANCELED
}

export class UpdateOrderDto {
    @ApiProperty({description: 'Статус заказа', example: "IN_USE"})
    status: status
}
