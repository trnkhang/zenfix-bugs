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
        { bookId: '2', price: 5.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // 3 * 10.00 + 2 * 5.00 = 30 + 10 = 40
    expect(result.total).toBe(40);
    expect(result.itemCount).toBe(2);
  });

  it('should handle single item with quantity', () => {
    const dto = {
      items: [
        { bookId: '1', price: 25.00, quantity: 5 },
      ],
    };
    const result = service.checkout(dto as any);
    expect(result.total).toBe(125);
  });

  it('should throw error for empty cart', () => {
    expect(() => service.checkout({ items: [] } as any)).toThrow(BadRequestException);
  });
});