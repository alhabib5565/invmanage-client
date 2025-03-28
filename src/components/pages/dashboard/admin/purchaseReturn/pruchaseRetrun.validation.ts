import * as z from "zod";

export const purchaseRetrunSchema = z.object({
  returnDate: z.date({
    required_error: "Date is required",
  }),

  warehouse: z.string({ required_error: "Please select a warehouse" }),
  supplier: z.string({ required_error: "Please select a supplier" }),
});
export const defaultPurchaseRetrunValues = {
  returnDate: new Date(),
  warehouse: "",
  supplier: "",
};
