export type TBook = {
  _id: string;
  bookTitle: string;
  bookID: string;
  bookImage: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TBookStock = {
  _id: string;
  bookTitle: string;
  bookID: string;
  totalPurchasedQuantity: number;
  totalPurchasePrice: number;
  avgPurchasesPricePerUnit: number;
  totalSoldQuantity: number;
  totalSoldPrice: number;
  avgSoldPricePerUnit: number;
  availableStock: number;
  remainingAssignedBook: number;
};
