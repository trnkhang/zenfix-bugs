export interface Book {
  id: string
  title: string
  author: string
  price: number
  discountPct: number
  stock: number
}

export interface CartItem {
  bookId: string
  title: string
  price: number
  quantity: number
}
