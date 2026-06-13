import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '4',
  ) {
    return this.booksService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Get(':id/price')
  getDiscountedPrice(@Param('id') id: string) {
    return this.booksService.getDiscountedPrice(id);
  }
}
