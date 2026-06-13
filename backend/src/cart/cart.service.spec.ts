  describe('checkout', () => {
    it('should calculate total by multiplying price * quantity for each item', () => {
      const dto: CheckoutDto = {
        items: [
          { bookId: 1, title: 'Book A', price: 10.00, quantity: 3 },
          { bookId: 2, title: 'Book B', price: 15.00, quantity: 2 },
        ],
      };
      const result = service.checkout(dto);
      // 10*3 + 15*2 = 30 + 30 = 60
      expect(result.total).toBe(60);
      expect(result.itemCount).toBe(2);
    });

    it('should handle single quantity items', () => {
      const dto: CheckoutDto = {
        items: [{ bookId: 1, title: 'Book A', price: 25.00, quantity: 1 }],
      };
      const result = service.checkout(dto);
      expect(result.total).toBe(25);
    });
  });