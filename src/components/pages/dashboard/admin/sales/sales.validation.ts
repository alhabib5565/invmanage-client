import * as z from "zod";

export const salesSchema = z.object({
  salesDate: z.any({
    required_error: "Sales date is required",
  }),

  warehouse: z.string().min(1, { message: "Please select a warehouse" }),

  customer: z.string().min(1, { message: "Please select a customer" }),

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
  paymentMethod: z.enum(["Cash"], {
    required_error: "Payment Method is required",
  }),
  note: z.string().optional().or(z.literal("")),
});

export const defaultSalesValues = {
  salesDate: new Date(),
  warehouse: "67e6694523cfc287f1ee223d",
  customer: "67c175e1b848828758dae661",
  taxRate: "0",
  discountAmount: "0",
  shipping: "0",
  paidAmount: "0",
  paymentStatus: "Pending",
  paymentMethod: "Cash",
  note: "",
};
