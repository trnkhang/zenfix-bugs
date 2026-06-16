import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';

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
        { bookId: 1, price: 10, quantity: 3 },
        { bookId: 2, price: 25, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 3 * 10 + 2 * 25 = 30 + 50 = 80
    expect(result.total).toBe(80);
  });

  it('should throw when cart is empty', () => {
    expect(() => service.checkout({ items: [] })).toThrow(BadRequestException);
  });
});