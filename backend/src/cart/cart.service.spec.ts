import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { CheckoutDto } from './dto/checkout.dto';
import { BadRequestException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should calculate total correctly when items have quantity > 1', () => {
    const dto: CheckoutDto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },
        { bookId: '2', price: 15.00, quantity: 2 },
      ],
    };
    
    const result = service.checkout(dto);
    
    // Expected: (10 * 3) + (15 * 2) = 30 + 30 = 60
    expect(result.total).toBe(60);
    expect(result.itemCount).toBe(2);
  });

  it('should throw BadRequestException when cart is empty', () => {
    const dto: CheckoutDto = { items: [] };
    
    expect(() => service.checkout(dto)).toThrow(BadRequestException);
  });
});