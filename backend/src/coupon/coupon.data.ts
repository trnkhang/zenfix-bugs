export interface Coupon {
  code: string;
  discountPct: number;
  minimumOrder: number;
  maxUsage: number;
  usedCount: number;
}

export const COUPONS: Coupon[] = [
  { code: 'SAVE10', discountPct: 10, minimumOrder: 50, maxUsage: 100, usedCount: 0 },
  { code: 'SAVE20', discountPct: 20, minimumOrder: 100, maxUsage: 50, usedCount: 0 },
  { code: 'WELCOME', discountPct: 15, minimumOrder: 30, maxUsage: 200, usedCount: 0 },
];
