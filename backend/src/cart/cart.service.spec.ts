import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
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

  it('should calculate total correctly when items have quantity > 1', () => {
    const dto: CheckoutDto = {
      items: [
        { bookId: '1', price: 10.00, quantity: 3 },  // 30.00
        { bookId: '2', price: 15.00, quantity: 2 },  // 30.00
      ],
    };

    const result = service.checkout(dto);

    expect(result.total).toBe(60.00);
    expect(result.itemCount).toBe(2);
  });

  it('should throw BadRequestException for empty cart', () => {
    const dto: CheckoutDto = { items: [] };

    expect(() => service.checkout(dto)).toThrow(BadRequestException);
  });
});