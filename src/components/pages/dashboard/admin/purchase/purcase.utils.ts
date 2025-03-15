import { TProductItemWithQuanity } from "./purchase.type";

export const calculateProductTotals = (product: TProductItemWithQuanity) => {
  const { productPrice, quantity, tax, taxType } = product;

  const taxAmount = (productPrice / 100) * tax * quantity; // total tax

  const subTotal =
    taxType === "inclusive"
      ? productPrice * quantity
      : productPrice * quantity + taxAmount;

  const netUnitPrice =
    taxType === "inclusive"
      ? productPrice - (tax * productPrice) / 100
      : productPrice;

  return {
    taxAmount,
    subTotal,
    netUnitPrice,
  };
};
