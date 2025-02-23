import { TBook } from "../book/book.type";

export type TBookPurchase = {
  _id: string;
  parchaseBookId: string;
  book: TBook;
  author: string;
  publisher: string;
  quantityPurchased: number;
  purchasePricePerUnit: number;
  supplierName: string;
  purchaseDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
