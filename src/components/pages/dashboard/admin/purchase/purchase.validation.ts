import * as z from "zod";

export const purchaseSchema = z.object({
  purchaseDate: z.date({
    required_error: "Purchase date is required",
  }),
  warehouse: z.string({
    required_error: "Warehouse is required",
  }),
  supplier: z.string({
    required_error: "Supplier is required",
  }),
  paidAmount: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed >= 0;
    },
    {
      message: "Paid amount must be a number greater than or equal to 0",
    }
  ),
  paymentStatus: z.enum(["Paid", "Partial", "Pending"], {
    required_error: "Payment status is required",
  }),
});

export const defaultPurchaseValues = {
  purchaseDate: new Date(),
  warehouse: "",
  supplier: "",
  paidAmount: 0,
  paymentStatus: "Pending",
};
