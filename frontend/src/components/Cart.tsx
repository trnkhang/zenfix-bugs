import { useState } from 'react'
import { api } from '../api'
import type { CartItem } from '../types'

interface Props {
  items: CartItem[]
  onChange: (items: CartItem[]) => void
}

export function Cart({ items, onChange }: Props) {
  const [checkoutResult, setCheckoutResult] = useState<{ total: number; itemCount: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponResult, setCouponResult] = useState<{ discountPct: number; savings: number; discountedTotal: number } | null>(null)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  function increment(bookId: string) {
    // BUG: spreads all existing items plus a new duplicate entry instead of updating the matching item's quantity
    const item = items.find((i) => i.bookId === bookId)!
    onChange([...items, { ...item, quantity: item.quantity + 1 }])
  }

  function decrement(bookId: string) {
    onChange(
      items
        .map((i) => (i.bookId === bookId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    )
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    setCouponError(null)
    try {
      const result = await api.coupons.apply(couponCode.trim(), subtotal)
      setCouponResult(result)
    } catch (e) {
      setCouponError(e instanceof Error ? e.message : 'Invalid coupon')
      setCouponResult(null)
    } finally {
      setCouponLoading(false)
    }
  }

  async function handleCheckout() {
    setLoading(true)
    try {
      const result = await api.cart.checkout(
        items.map((i) => ({ bookId: i.bookId, price: i.price, quantity: i.quantity })),
      )
      setCheckoutResult(result)
      onChange([])
    } finally {
      setLoading(false)
    }
  }

  if (checkoutResult) {
    return (
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', background: '#fff' }}>
        <h2 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Order placed!</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          {checkoutResult.itemCount} item(s) — Total: <strong>${checkoutResult.total.toFixed(2)}</strong>
        </p>
        <button
          onClick={() => setCheckoutResult(null)}
          style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: '1.25rem', background: '#fff', position: 'sticky', top: '2rem' }}>
      <h2 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1.1rem' }}>Cart ({items.length})</h2>

      {items.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No items yet.</p>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((item, idx) => (
              <div key={`${item.bookId}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', flex: 1 }}>{item.title}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button onClick={() => decrement(item.bookId)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}>−</button>
                  <span style={{ fontSize: '0.875rem', minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => increment(item.bookId)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0891b2', minWidth: 52, textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1rem', paddingTop: '0.75rem' }}>
            {/* Coupon input */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => { setCouponCode(e.target.value); setCouponResult(null); setCouponError(null) }}
                style={{ flex: 1, padding: '0.4rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.8rem', outline: 'none' }}
              />
              <button
                onClick={handleApplyCoupon}
                disabled={couponLoading || !couponCode.trim()}
                style={{ padding: '0.4rem 0.75rem', borderRadius: 8, border: '1px solid #0891b2', background: '#fff', color: '#0891b2', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', opacity: couponLoading ? 0.6 : 1 }}
              >
                Apply
              </button>
            </div>
            {couponError && <p style={{ fontSize: '0.75rem', color: '#dc2626', marginBottom: '0.5rem' }}>{couponError}</p>}
            {couponResult && (
              <p style={{ fontSize: '0.75rem', color: '#16a34a', marginBottom: '0.5rem' }}>
                {couponResult.discountPct}% off applied — you save ${couponResult.savings.toFixed(2)}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontWeight: 700, color: '#0891b2' }}>
                ${(couponResult ? couponResult.discountedTotal : subtotal).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{ width: '100%', padding: '0.625rem', borderRadius: 8, border: 'none', background: '#0f172a', color: '#fff', cursor: 'pointer', fontWeight: 600, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Processing…' : 'Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
