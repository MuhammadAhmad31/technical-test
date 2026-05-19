export type CheckoutRequest = {
  price?: number;
  voucherPercentage?: number;
  pointPercentage?: number;
};

export type CheckoutResponse = {
  currency: "IDR";
  price: number;
  voucherPercentage: number;
  discountAmount: number;
  totalPayment: number;
  pointPercentage: number;
  earnedPoints: number;
};
