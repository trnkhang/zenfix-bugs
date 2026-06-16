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

  it('should calculate total by multiplying price by quantity', () => {
    const dto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 25.00, quantity: 2 },
      ],
    };
    // Expected: (10 * 3) + (25 * 2) = 30 + 50 = 80
    const result = service.checkout(dto);
    expect(result.total).toBe(80);
    expect(result.itemCount).toBe(2);
  });

  it('should throw BadRequestException for empty cart', () => {
    expect(() => service.checkout({ items: [] })).toThrow(BadRequestException);
  });
});