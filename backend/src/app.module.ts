import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [BooksModule, CartModule],
})
export class AppModule {}
