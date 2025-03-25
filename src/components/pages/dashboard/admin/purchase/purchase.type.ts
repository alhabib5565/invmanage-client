import { TProduct } from "../product/product.type";

export type TPurchaseProductItem = {
  productName: string;
  code: string;
  product: string;
  productCost: number;
  productPrice: number;
  netUnitPrice: number;
  taxType: "inclusive" | "exclusive";
  productTaxRate: number;
  taxAmount: number;
  discountAmount: number;
  quantity: number;
  subTotal: number;
};

export type TProductItemWithQuanity = TProduct & {
  quantity: number;
};

export type TPurchase = {
  _id: string;
  purchaseDate: string;
  purchaseId: string;
  warehouse: string;
  supplier: string;
  discountAmount: number;
  shipping: number;
  taxRate: number;
  taxAmount: number;
  items: TPurchaseProductItem[];
  totalPurchaseAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
};
