import { Body, Controller, Post } from '@nestjs/common';
import OrderService from './order.service';
import { IFilmOrder } from './dto/order.dto';

@Controller('order')
export default class OrderController {
  constructor(public readonly orderService: OrderService) {}

  @Post('')
  create(@Body() body: IFilmOrder) {
    return this.orderService.orderTickets(body);
  }
}
