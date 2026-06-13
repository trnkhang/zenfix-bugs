# Zenfix Bug Demo — Bookstore

A minimal fullstack bookstore app intentionally seeded with bugs for demonstrating the **Zenfix** automated bug-to-PR pipeline.

Zenfix connects this repo, embeds it in a vector store, and when a bug report is filed it:
1. Embeds the report and searches for relevant code
2. Runs a multi-turn investigation with an LLM agent
3. Opens a PR with the fix

---

## Seeded Bugs

| # | File | Line | Description |
|---|------|------|-------------|
| 1 | `backend/src/books/books.service.ts` | 9 | **Pagination off-by-one** — `skip = page * limit` should be `(page - 1) * limit`. Page 1 always skips the first page of results. |
| 2 | `backend/src/books/books.service.ts` | 20 | **Wrong discount formula** — subtracts `discountPct` as a raw dollar amount instead of applying it as a percentage. A $45 book with 15% off returns $30 instead of $38.25. |
| 3 | `backend/src/cart/cart.service.ts` | 10 | **Checkout ignores quantity** — `reduce` sums `item.price` once per line, regardless of how many copies. Buying 3×$45 books returns $45 instead of $135. |
| 4 | `frontend/src/components/BookList.tsx` | 20 | **Stale `useEffect` deps** — `page` is missing from the dependency array, so navigating to a different page never re-fetches. |
| 5 | `frontend/src/components/Cart.tsx` | 17 | **Increment duplicates cart entry** — spreads all existing items plus a new entry instead of updating the matching item's `quantity`. |

---

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS · TypeScript · Node.js |
| Frontend | React 18 · TypeScript · Vite |

---

## Run

### Backend

```bash
cd backend
npm install
npm run start:dev
# API runs on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# UI runs on http://localhost:5174
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/books?page=1&limit=4` | List books (paginated) |
| GET | `/books/:id` | Get a single book |
| GET | `/books/:id/price` | Get discounted price |
| POST | `/cart/checkout` | Calculate order total |

### Sample checkout request

```json
POST /cart/checkout
{
  "items": [
    { "bookId": "1", "price": 45.00, "quantity": 3 }
  ]
}
```

Expected (correct): `{ "total": 135.00 }` — Actual (buggy): `{ "total": 45.00 }`
