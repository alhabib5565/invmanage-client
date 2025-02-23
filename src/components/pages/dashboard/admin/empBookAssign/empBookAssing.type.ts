import { TBook } from "../book/book.type";
import { TEmployee } from "../employee-management/employee.type";

export type TEmpBookAssign = {
  _id: string;
  assignId: string;
  employee: TEmployee;
  book: TBook;
  quantityAssigned: number;
  pricePerUnit: number;
  assignDate: string;
  totalPrice: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
