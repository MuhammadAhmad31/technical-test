import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import type { CheckoutRequest, CheckoutResponse } from "@repo/shared";
import { CheckoutService } from "./checkout.service.js";

@Controller("checkout")
export class CheckoutController {
  constructor(@Inject(CheckoutService) private readonly checkoutService: CheckoutService) {}

  @Get("sample")
  sample(): CheckoutResponse {
    return this.checkoutService.calculate();
  }

  @Post()
  checkout(@Body() body: CheckoutRequest): CheckoutResponse {
    return this.checkoutService.calculate(body);
  }
}
