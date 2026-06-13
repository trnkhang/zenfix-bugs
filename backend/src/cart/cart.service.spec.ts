import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should multiply price by quantity for each item', () => {
    const dto = {
      items: [
        { bookId: '1', price: 10, quantity: 3 },
        { bookId: '2', price: 15, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 3 * 10 + 2 * 15 = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });

  it('should handle single item with quantity', () => {
    const dto = {
      items: [{ bookId: '1', price: 25, quantity: 4 }],
    };
    const result = service.checkout(dto);
    expect(result.total).toBe(100);
  });
});