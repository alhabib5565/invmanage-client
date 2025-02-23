import { z } from "zod";

export const paymentFormSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  collectedBy: z.string().min(1, "Collected By is required"),
  amountCollected: z
    .string({ invalid_type_error: "Collected Amount must be a number" })
    .min(1, "Collected Amount must be at least 1"),
  paymentDate: z.string().min(1, "Payment Date is required"),
  notes: z.string().optional(),
});
