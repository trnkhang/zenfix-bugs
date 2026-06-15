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

  it('should calculate total correctly when items have quantity > 1', () => {
    const dto = {
      items: [
        { bookId: '1', title: 'Book A', price: 10, quantity: 3 },
        { bookId: '2', title: 'Book B', price: 15, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 3 * 10 + 2 * 15 = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });

  it('should throw BadRequestException for empty cart', () => {
    expect(() => service.checkout({ items: [] })).toThrow(BadRequestException);
  });
});