import { TCustomer } from "../customer-management/customer.type";
import { TWarehouse } from "../warehouse/warehouse.type";

export type TSalesItem = {
  productName: string;
  code: string;
  product: string;
  saleUnit: string;
  productCost: number;
  productPrice: number;
  netUnitPrice: number;
  taxType: string;
  productTaxRate: number;
  taxAmount: number;
  discountAmount: number;
  quantity: number;
  subTotal: number;
};
export type TSales = {
  _id: string;
  salesDate: string;
  salesId: string;
  warehouse: TWarehouse;
  customer: TCustomer;
  discountAmount: number;
  shipping: number;
  taxRate: number;
  taxAmount: number;
  items: TSalesItem[];
  totalSalesAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
};
