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

  it('should calculate total with quantity', () => {
    const dto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 5.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto as any);
    // 3 * 10.00 + 2 * 5.00 = 30 + 10 = 40
    expect(result.total).toBe(40);
    expect(result.itemCount).toBe(2);
  });
});