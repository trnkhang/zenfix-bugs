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

  it('should calculate total with quantity > 1', () => {
    const dto = {
      items: [
        { name: 'Book', price: 10.00, quantity: 3 },
        { name: 'Pen', price: 2.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // 10 * 3 + 2 * 2 = 30 + 4 = 34
    expect(result.total).toBe(34);
    expect(result.itemCount).toBe(2);
  });
});