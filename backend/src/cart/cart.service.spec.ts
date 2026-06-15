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

  it('should calculate total by multiplying price by quantity', () => {
    const dto = {
      items: [
        { price: 10.00, quantity: 3 },
        { price: 25.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // (10.00 * 3) + (25.00 * 2) = 30 + 50 = 80
    expect(result.total).toBe(80);
    expect(result.itemCount).toBe(2);
  });

  it('should handle single item with quantity of 1', () => {
    const dto = {
      items: [{ price: 15.99, quantity: 1 }],
    };
    const result = service.checkout(dto as any);
    expect(result.total).toBe(15.99);
    expect(result.itemCount).toBe(1);
  });
});