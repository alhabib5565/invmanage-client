import { z } from "zod";

const bookAssignSchema = z.object({
  book: z.string().min(1, "Book is required."),
  employee: z.string().min(1, "Employee selection is required."),
  quantityAssigned: z.string({
    invalid_type_error: "Quantity Assigned must be a number.",
  }),
  pricePerUnit: z.string({
    invalid_type_error: "Price per Unit must be a number.",
  }),
  assignDate: z.string().min(1, "Assigned Date is required."),
  notes: z.string().optional(),
});

const bookAssignDefaultValue = {
  book: "",
  employee: "",
  quantityAssigned: 1,
  pricePerUnit: 0,
  assignDate: "",
  notes: "",
};

export { bookAssignDefaultValue, bookAssignSchema };
