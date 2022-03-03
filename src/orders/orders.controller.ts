import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {User} from "../auth/decorators/user.decorator";
import {Auth} from "../auth/decorators/auth.decorator";
import {ADMIN} from "../auth/decorators/roles-auth.decorator";

@ApiTags("Заказы")
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @ApiOperation({
        summary: 'Создать заказ',
        security: [{bearer: []}],
    })
    @Post()
    @Auth()
    create(@User() user, @Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(user, createOrderDto);
    }

    @ApiOperation({
        summary: 'Получить все заказы',
        security: [{bearer: []}],
    })
    @Get()
    @Auth(ADMIN)
    findAll() {
        return this.ordersService.findAll();
    }

    @ApiOperation({
        summary: 'Получить информацию о заказе',
        security: [{bearer: []}],
    })
    @Get(':id')
    @Auth()
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @ApiOperation({
        summary: 'Обновить информацию о заказе',
        security: [{bearer: []}],
    })
    @Auth()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @ApiOperation({
        summary: 'Удалить заказ',
        security: [{bearer: []}],
    })
    @Auth()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }
}
