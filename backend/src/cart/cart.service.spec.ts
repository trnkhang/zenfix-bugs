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

  it('should calculate total with quantity', () => {
    const dto: CheckoutDto = {
      items: [
        { id: 1, title: 'Book A', price: 10.00, quantity: 3 },
        { id: 2, title: 'Book B', price: 15.00, quantity: 2 },
      ],
    };
    const result = service.checkout(dto);
    // 3 * 10.00 + 2 * 15.00 = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });
});