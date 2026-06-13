import { BadRequestException, Injectable } from '@nestjs/common';
import { COUPONS } from './coupon.data';

@Injectable()
export class CouponService {
  apply(code: string, cartTotal: number) {
    const coupon = COUPONS.find((c) => c.code === code.toUpperCase());

    if (!coupon) {
      throw new BadRequestException(`Coupon "${code}" not found`);
    }

    if (coupon.usedCount >= coupon.maxUsage) {
      throw new BadRequestException(`Coupon "${code}" has reached its usage limit`);
    }

    const discounted = Math.round(cartTotal * (1 - coupon.discountPct / 100) * 100) / 100;

    // BUG: minimum order should be checked against the original cartTotal,
    // but it compares against the discounted total instead.
    // e.g. WELCOME (15% off, min $30): cart=$35 → discounted=$29.75 → $29.75 < $30 → rejected
    // even though the customer's actual cart ($35) meets the $30 minimum.
    if (discounted < coupon.minimumOrder) {
      throw new BadRequestException(
        `Minimum order of $${coupon.minimumOrder} required for coupon "${code}"`,
      );
    }

    coupon.usedCount += 1;

    return {
      code: coupon.code,
      discountPct: coupon.discountPct,
      originalTotal: cartTotal,
      discountedTotal: discounted,
      savings: Math.round((cartTotal - discounted) * 100) / 100,
    };
  }

  validate(code: string) {
    const coupon = COUPONS.find((c) => c.code === code.toUpperCase());
    if (!coupon) throw new BadRequestException(`Coupon "${code}" not found`);
    return {
      code: coupon.code,
      discountPct: coupon.discountPct,
      minimumOrder: coupon.minimumOrder,
      remaining: coupon.maxUsage - coupon.usedCount,
    };
  }
}
