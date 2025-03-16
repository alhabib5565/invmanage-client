import { TProductItemWithQuanity } from "./purchase.type";

export const calculateProductTotals = (product: TProductItemWithQuanity) => {
  const {
    productPrice,
    quantity,
    productTaxRate = 0,
    taxType,
    discountAmount = 0,
  } = product;
  const discountedPrice = productPrice - discountAmount;

  const netUnitPrice =
    taxType === "inclusive"
      ? discountedPrice / (1 + productTaxRate / 100)
      : discountedPrice;
  console.log(netUnitPrice);
  const taxAmount =
    taxType === "inclusive"
      ? discountedPrice * quantity - netUnitPrice * quantity
      : ((netUnitPrice * productTaxRate) / 100) * quantity;

  const subTotal =
    taxType === "inclusive"
      ? netUnitPrice * quantity
      : netUnitPrice * quantity + taxAmount;

  return {
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    subTotal: parseFloat(subTotal.toFixed(2)),
    netUnitPrice: parseFloat(netUnitPrice.toFixed(2)),
  };
};
