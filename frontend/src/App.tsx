import { useState } from 'react'
import { BookList } from './components/BookList'
import { Cart } from './components/Cart'
import type { CartItem } from './types'

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  function addToCart(item: CartItem) {
    setCart((prev) => {
      const existing = prev.find((i) => i.bookId === item.bookId)
      if (existing) {
        return prev.map((i) => i.bookId === item.bookId ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, item]
    })
  }

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Bookstore</h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: 4 }}>
          Zenfix bug demo — intentional bugs seeded for automated detection
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        <BookList onAddToCart={addToCart} />
        <Cart items={cart} onChange={setCart} />
      </div>
    </div>
  )
}
