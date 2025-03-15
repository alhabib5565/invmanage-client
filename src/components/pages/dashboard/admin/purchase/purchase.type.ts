import { TProduct } from "../product/product.type";

export type TPurchaseProductItem = {
  name: string;
  code: string;
  product: string;
  productCost: number;
  netUnitPrice: number;
  taxType: "inclusive" | "exclusive";
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  quantity: number;
  subTotal: number;
};

export type TProductItemWithQuanity = TProduct & {
  quantity: number;
};
