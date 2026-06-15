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

  it('should calculate total correctly with quantity', () => {
    const dto = {
      items: [
        { bookId: 1, price: 10.00, quantity: 3 },
        { bookId: 2, price: 15.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // Expected: (10 * 3) + (15 * 2) = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });

  it('should throw error for empty cart', () => {
    expect(() => service.checkout({ items: [] })).toThrow(BadRequestException);
  });
});