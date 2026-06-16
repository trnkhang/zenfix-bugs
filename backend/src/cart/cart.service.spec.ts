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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkout', () => {
    it('should calculate total with quantity multiplied', () => {
      const dto = {
        items: [
          { bookId: '1', price: 10, quantity: 3 },
          { bookId: '2', price: 20, quantity: 2 }
        ]
      };
      const result = service.checkout(dto);
      // 3 * $10 + 2 * $20 = $30 + $40 = $70
      expect(result.total).toBe(70);
      expect(result.itemCount).toBe(2);
    });

    it('should throw BadRequestException for empty cart', () => {
      expect(() => service.checkout({ items: [] })).toThrow(BadRequestException);
    });
  });
});