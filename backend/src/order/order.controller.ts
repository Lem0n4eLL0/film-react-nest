import { Body, Controller, Post } from '@nestjs/common';
import OrderService from './order.service';
import { FilmOrderDto } from './dto/order.dto';

@Controller('order')
export default class OrderController {
  constructor(public readonly orderService: OrderService) {}

  @Post('')
  create(@Body() body: FilmOrderDto) {
    return this.orderService.orderTickets(body);
  }
}
