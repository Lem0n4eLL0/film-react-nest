import { Test, TestingModule } from '@nestjs/testing';
import OrderController from './order.controller';
import OrderService from './order.service';
import { FilmOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    orderTickets: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call orderService.orderTickets with correct body and return its result', () => {
      const mockOrder: FilmOrderDto = {
        email: 'test@bk.com',
        phone: '89435674545',
        tickets: [],
      };
      mockOrderService.orderTickets.mockReturnValue(mockOrder);

      const result = controller.create(mockOrder);

      expect(orderService.orderTickets).toHaveBeenCalledTimes(1);
      expect(orderService.orderTickets).toHaveBeenCalledWith(mockOrder);
      expect(result).toBe(mockOrder);
    });
  });
});
