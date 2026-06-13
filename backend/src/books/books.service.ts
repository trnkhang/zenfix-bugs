import { Injectable, NotFoundException } from '@nestjs/common';
import { BOOKS } from './books.data';

@Injectable()
export class BooksService {
  findAll(page: number, limit: number) {
    // BUG: should be (page - 1) * limit — page 1 always skips the first `limit` books
    const skip = page * limit;
    const books = BOOKS.slice(skip, skip + limit);
    return { books, total: BOOKS.length, page, limit };
  }

  findOne(id: string) {
    const book = BOOKS.find((b) => b.id === id);
    if (!book) throw new NotFoundException(`Book ${id} not found`);
    return book;
  }

  getDiscountedPrice(id: string) {
    const book = this.findOne(id);
    // BUG: subtracts discountPct as a raw dollar amount, not as a percentage
    // e.g. $45 book with 15% off → returns $30 instead of $38.25
    const finalPrice = book.price - book.discountPct;
    return {
      id,
      originalPrice: book.price,
      discountPct: book.discountPct,
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }
}
