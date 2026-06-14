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

  it('should calculate total using price multiplied by quantity', () => {
    const dto: CheckoutDto = {
      items: [
        { bookId: '1', title: 'Book A', price: 10, quantity: 3 },
        { bookId: '2', title: 'Book B', price: 15, quantity: 2 },
      ],
    };

    const result = service.checkout(dto);

    // Expected: (10 * 3) + (15 * 2) = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });
});