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

  it('should calculate total with quantity multiplier', () => {
    const dto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 15.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // 3 * 10.00 + 2 * 15.00 = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });

  it('should handle single item with quantity', () => {
    const dto = {
      items: [{ bookId: '1', price: 25.00, quantity: 5 }],
    };
    const result = service.checkout(dto as any);
    expect(result.total).toBe(125);
  });
});