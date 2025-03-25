import * as z from "zod";

export const purchaseSchema = z.object({
  purchaseDate: z.string({
    required_error: "Purchase date is required",
  }),

  warehouse: z.string().min(1, { message: "Please select a warehouse" }),

  supplier: z.string().min(1, { message: "Please select a supplier" }),

  taxRate: z
    .union([z.string(), z.number()])
    .optional()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Tax rate must be a non-negative number",
    })
    .refine((val) => Number(val) <= 100, {
      message: "Tax rate can't be greater than 100",
    }),

  discountAmount: z
    .string()
    .optional()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Discount amount must be a non-negative number",
    }),

  shipping: z
    .string()
    .optional()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Shipping cost must be a non-negative number",
    }),

  paidAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Paid amount must be a non-negative number",
    }),

  paymentStatus: z.enum(["Paid", "Partial", "Pending"], {
    required_error: "Payment status is required",
  }),
});

export const defaultPurchaseValues = {
  purchaseDate: new Date(),
  warehouse: "",
  supplier: "",
  taxRate: "0",
  discountAmount: "0",
  shipping: "0",
  paidAmount: "0",
  paymentStatus: "Pending",
};
