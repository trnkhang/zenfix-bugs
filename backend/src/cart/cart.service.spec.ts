import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CheckoutDto } from './dto/checkout.dto';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should calculate total with item quantity', () => {
    const dto: CheckoutDto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 15.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 3 * 10.00 + 2 * 15.00 = 30 + 30 = 60
    expect(result.total).toBe(60);
  });
});