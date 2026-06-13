import { useEffect, useState } from 'react'
import { api } from '../api'
import type { Book, CartItem } from '../types'

interface Props {
  onAddToCart: (item: CartItem) => void
}

export function BookList({ onAddToCart }: Props) {
  const [books, setBooks] = useState<Book[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // BUG: `page` is missing from the dependency array — navigating pages never re-fetches
    api.books.list(page).then((data) => {
      setBooks(data.books)
      setTotal(data.total)
      setLoading(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.ceil(total / 4)

  return (
    <div>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>Books</h2>

      {loading ? (
        <p style={{ color: '#64748b' }}>Loading…</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {books.map((book) => (
            <div key={book.id} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1rem', background: '#fff' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4 }}>{book.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8 }}>{book.author}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#0891b2' }}>${book.price.toFixed(2)}</span>
                <span style={{ fontSize: '0.75rem', background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: 99 }}>
                  {book.discountPct}% off
                </span>
              </div>
              <button
                onClick={() => onAddToCart({ bookId: book.id, title: book.title, price: book.price, quantity: 1 })}
                style={{ marginTop: '0.75rem', width: '100%', padding: '0.5rem', borderRadius: 8, border: 'none', background: '#0891b2', color: '#fff', cursor: 'pointer', fontWeight: 500 }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', alignItems: 'center' }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          style={{ padding: '0.4rem 0.875rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1 }}
        >
          ←
        </button>
        <span style={{ fontSize: '0.875rem', color: '#475569' }}>Page {page} / {totalPages || '…'}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          style={{ padding: '0.4rem 0.875rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1 }}
        >
          →
        </button>
      </div>
    </div>
  )
}
