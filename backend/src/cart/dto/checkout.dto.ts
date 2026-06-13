export class CartItemDto {
  bookId: string;
  price: number;
  quantity: number;
}

export class CheckoutDto {
  items: CartItemDto[];
}
