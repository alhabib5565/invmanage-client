export type TPurchaseReturn = {
  _id: string;
  returnID: string;
  purchase: string;
  warehouse: string;
  supplier: string;
  returnDate: string;
  returnItems: purchaseReturnItem[];
  totalReturnAmount: number;
};

export interface purchaseReturnItem {
  productName: string;
  code: string;
  product: string;
  productCost: number;
  productPrice: number;
  netUnitPrice: number;
  taxType: string;
  productTaxRate: number;
  taxAmount: number;
  discountAmount: number;
  quantity: number;
  subTotal: number;
}
