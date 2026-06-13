import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { CheckoutDto } from './dto/checkout.dto';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should calculate total using price multiplied by quantity', () => {
    const dto: CheckoutDto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 5.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 10 * 3 + 5 * 2 = 30 + 10 = 40
    expect(result.total).toBe(40);
    expect(result.itemCount).toBe(2);
  });
});