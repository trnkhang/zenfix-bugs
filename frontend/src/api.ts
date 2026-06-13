import type { Book } from './types'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, init)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export const api = {
  books: {
    list: (page: number, limit = 4) =>
      request<{ books: Book[]; total: number; page: number; limit: number }>(
        `/books?page=${page}&limit=${limit}`,
      ),
    getPrice: (id: string) =>
      request<{ id: string; originalPrice: number; discountPct: number; finalPrice: number }>(
        `/books/${id}/price`,
      ),
  },
  cart: {
    checkout: (items: { bookId: string; price: number; quantity: number }[]) =>
      request<{ total: number; itemCount: number }>('/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      }),
  },
  coupons: {
    apply: (code: string, cartTotal: number) =>
      request<{ code: string; discountPct: number; originalTotal: number; discountedTotal: number; savings: number }>(
        '/coupons/apply',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, cartTotal }),
        },
      ),
  },
}
