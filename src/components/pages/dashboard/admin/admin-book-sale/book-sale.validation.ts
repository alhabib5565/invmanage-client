import { z } from "zod";

export const bookSaleFormSchema = z.object({
  book: z.string().min(1, "Book is required"),
  saleBy: z.string().min(1, "Sales by is required"),
  customer: z.string().min(1, "Customer selection is required"),
  totalQuantitySold: z
    .string({ invalid_type_error: "Total Quantity Sold must be a number" })
    .min(1, "Quantity must be at least 1"),
  sellingPricePerUnit: z
    .string({ invalid_type_error: "Selling Price must be a number" })
    .min(0.01, "Selling Price must be at least 0.01"),
  totalSaleAmount: z.number().optional(), // Auto-calculated, so no validation
  saleDate: z.string().min(1, "Sale Date is required"),
  saleType: z.string().min(1, "Sale Type is required"),
  notes: z.string().optional(),
});

export const bookSaleFormDefaultValues = {
  book: "",
  saleBy: "",
  customer: "",
  totalQuantitySold: 0,
  sellingPricePerUnit: 0,
  saleDate: "",
  saleType: "",
  notes: "",
};
