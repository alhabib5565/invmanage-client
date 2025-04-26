import { z } from "zod";

export const salesReturnSchema = z.object({
  returnDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  warehouse: z.string().min(1, { message: "Please select a warehouse" }),
  customer: z.string({ required_error: "Please select a customer" }),
});

export const defaultSaleseRetrunValues = {
  returnDate: new Date(),
  warehouse: "",
  customer: "",
};
