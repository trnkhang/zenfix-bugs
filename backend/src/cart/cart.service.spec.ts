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
        { price: 10, quantity: 3 },
        { price: 25, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // 3 * 10 + 2 * 25 = 30 + 50 = 80
    expect(result.total).toBe(80);
    expect(result.itemCount).toBe(2);
  });
});