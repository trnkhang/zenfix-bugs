import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CartService {
  checkout(dto: CheckoutDto) {
    if (!dto.items?.length) {
      throw new BadRequestException('Cart is empty');
    }
    const total = dto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { total: Math.round(total * 100) / 100, itemCount: dto.items.length };
  }
}
