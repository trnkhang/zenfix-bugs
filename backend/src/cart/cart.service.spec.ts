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

  it('should calculate total using unit price multiplied by quantity', () => {
    const dto: CheckoutDto = {
      items: [
        { bookId: 1, price: 10.00, quantity: 3 },
        { bookId: 2, price: 25.00, quantity: 2 },
      ],
    };

    const result = service.checkout(dto);

    // (10.00 * 3) + (25.00 * 2) = 30 + 50 = 80
    expect(result.total).toBe(80);
    expect(result.itemCount).toBe(2);
  });

  it('should throw BadRequestException when cart is empty', () => {
    const dto: CheckoutDto = { items: [] };

    expect(() => service.checkout(dto)).toThrow(BadRequestException);
  });

  it('should handle single item with quantity of 1', () => {
    const dto: CheckoutDto = {
      items: [{ bookId: 1, price: 15.99, quantity: 1 }],
    };

    const result = service.checkout(dto);
    expect(result.total).toBe(15.99);
  });
});