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
        { id: '1', name: 'Book A', price: 10.00, quantity: 3 },
        { id: '2', name: 'Book B', price: 15.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // Expected: (10 * 3) + (15 * 2) = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });

  it('should handle single item with quantity', () => {
    const dto = {
      items: [
        { id: '1', name: 'Book A', price: 25.00, quantity: 5 },
      ],
    };
    const result = service.checkout(dto);
    expect(result.total).toBe(125);
  });
});