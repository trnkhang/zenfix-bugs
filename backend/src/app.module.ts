import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [BooksModule, CartModule, CouponModule],
})
export class AppModule {}
