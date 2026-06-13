import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { BadRequestException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should calculate total with quantity correctly', () => {
    const dto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 25.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // 10 * 3 + 25 * 2 = 30 + 50 = 80
    expect(result.total).toBe(80);
    expect(result.itemCount).toBe(2);
  });
});