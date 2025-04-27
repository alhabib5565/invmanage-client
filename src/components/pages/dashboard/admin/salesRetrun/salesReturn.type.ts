export type TSalesRetrun = {
  _id: string;
  returnID: string;
  sale: string;
  warehouse: string;
  customer: string;
  returnDate: string;
  returnItems: TSalesReturnItem[];
  totalReturnAmount: number;
  createdAt: string;
  updatedAt: string;
};

export interface TSalesReturnItem {
  product: string;
  quantity: number;
  retrunSubTotal: number;
  _id: string;
}
