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

  it('should calculate total by multiplying price by quantity for each item', () => {
    const dto = {
      items: [
        { id: '1', title: 'Book A', price: 10.00, quantity: 3 },
        { id: '2', title: 'Book B', price: 15.00, quantity: 2 },
      ],
    };
    // Expected: (10 * 3) + (15 * 2) = 30 + 30 = 60
    const result = service.checkout(dto);
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });
});