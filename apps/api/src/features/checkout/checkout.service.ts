import { Injectable } from "@nestjs/common";
import type { CheckoutRequest, CheckoutResponse } from "@repo/shared";

@Injectable()
export class CheckoutService {
  calculate({
    price = 5_000_000,
    voucherPercentage = 50,
    pointPercentage = 2
  }: CheckoutRequest = {}): CheckoutResponse {
    const discountAmount = Math.round(price * (voucherPercentage / 100));
    const totalPayment = Math.max(price - discountAmount, 0);
    const earnedPoints = Math.round(discountAmount * (pointPercentage / 100));

    return {
      currency: "IDR",
      price,
      voucherPercentage,
      discountAmount,
      totalPayment,
      pointPercentage,
      earnedPoints
    };
  }
}
