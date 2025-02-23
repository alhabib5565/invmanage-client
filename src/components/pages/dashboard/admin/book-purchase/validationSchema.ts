import { z } from "zod";

export const bookPurchaseSchema = z.object({
  book: z.string().min(1, { message: "Book is required" }),
  author: z.string().optional(),
  publisher: z.string().optional(),
  quantityPurchased: z
    .string({ invalid_type_error: "Quantity must be a number" })
    .min(1, { message: "Quantity must be at least 1" }),
  purchasePricePerUnit: z
    .string({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price must be a positive number" }),
  purchaseDate: z.string().min(1, { message: "Purchase Date is required" }),
  supplierName: z.string().optional(),
  notes: z.string().optional(),
});

export const bookPurchaseDefaultValue = {
  book: "",
  author: "",
  publisher: "",
  quantityPurchased: 0,
  purchasePricePerUnit: 0,
  purchaseDate: "",
  supplierName: "",
  notes: "",
};
