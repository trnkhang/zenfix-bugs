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

  it('should calculate total with quantity', () => {
    const dto = {
      items: [
        { bookId: 1, price: 10, quantity: 3 },
        { bookId: 2, price: 25, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    expect(result.total).toBe(80); // (10*3) + (25*2) = 30 + 50 = 80
  });

  it('should throw when cart is empty', () => {
    expect(() => service.checkout({ items: [] } as any)).toThrow(BadRequestException);
  });
});