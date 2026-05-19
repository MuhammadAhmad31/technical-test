import type { CheckoutRequest, CheckoutResponse } from "@repo/shared";
import { apiRequest } from "../../../shared/api/api-client";

export function getCheckoutSample() {
  return apiRequest<CheckoutResponse>("/checkout/sample");
}

export function calculateCheckout(payload: CheckoutRequest) {
  return apiRequest<CheckoutResponse>("/checkout", {
    method: "POST",
    body: payload
  });
}
