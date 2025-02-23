import { TBook } from "../book/book.type";
import { TCustomer } from "../customer-management/customer.type";
import { TEmployee } from "../employee-management/employee.type";

export type TBookSale = {
  _id: string;
  saleId: string;
  customer: TCustomer;
  saleBy: TEmployee;
  book: TBook;
  totalQuantitySold: number;
  sellingPricePerUnit: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  saleDate: string;
  saleType: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
