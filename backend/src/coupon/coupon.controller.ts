import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CouponService } from './coupon.service';

class ApplyCouponDto {
  code: string;
  cartTotal: number;
}

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get(':code')
  validate(@Param('code') code: string) {
    return this.couponService.validate(code);
  }

  @Post('apply')
  apply(@Body() dto: ApplyCouponDto) {
    return this.couponService.apply(dto.code, dto.cartTotal);
  }
}
