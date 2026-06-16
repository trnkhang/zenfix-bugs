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

  it('should calculate total using price multiplied by quantity', () => {
    const dto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 25.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 3 * 10.00 + 2 * 25.00 = 30 + 50 = 80
    expect(result.total).toBe(80);
  });

  it('should handle single item with quantity of 1', () => {
    const dto = {
      items: [{ bookId: '1', price: 15.99, quantity: 1 }],
    };
    const result = service.checkout(dto);
    expect(result.total).toBe(15.99);
  });
});