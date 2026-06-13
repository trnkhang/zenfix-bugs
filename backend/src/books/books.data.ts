export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  discountPct: number;
  stock: number;
}

export const BOOKS: Book[] = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin', price: 45.0, discountPct: 15, stock: 10 },
  { id: '2', title: 'The Pragmatic Programmer', author: 'David Thomas', price: 55.0, discountPct: 20, stock: 5 },
  { id: '3', title: 'Design Patterns', author: 'Gang of Four', price: 60.0, discountPct: 10, stock: 8 },
  { id: '4', title: 'Refactoring', author: 'Martin Fowler', price: 50.0, discountPct: 25, stock: 3 },
  { id: '5', title: 'The Clean Coder', author: 'Robert C. Martin', price: 40.0, discountPct: 5, stock: 12 },
  { id: '6', title: 'Domain-Driven Design', author: 'Eric Evans', price: 65.0, discountPct: 30, stock: 6 },
  { id: '7', title: 'Working Effectively with Legacy Code', author: 'Michael Feathers', price: 48.0, discountPct: 12, stock: 4 },
  { id: '8', title: 'Structure and Interpretation of Computer Programs', author: 'Harold Abelson', price: 70.0, discountPct: 18, stock: 7 },
  { id: '9', title: 'Introduction to Algorithms', author: 'CLRS', price: 80.0, discountPct: 22, stock: 9 },
  { id: '10', title: "You Don't Know JS", author: 'Kyle Simpson', price: 35.0, discountPct: 8, stock: 15 },
  { id: '11', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', price: 30.0, discountPct: 10, stock: 11 },
  { id: '12', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', price: 38.0, discountPct: 15, stock: 13 },
];
