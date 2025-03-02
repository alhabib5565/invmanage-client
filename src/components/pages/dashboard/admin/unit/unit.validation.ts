import { z } from "zod";

export const unitFormSchema = z.object({
  name: z.string().min(1, { message: "Unit name is required" }),
  baseUnit: z.string().min(1, { message: "Base unit is required" }),
  conversionRatio: z
    .string({ invalid_type_error: "Conversion ratio must be valid number" })
    .min(0, { message: "Conversion ratio must be a positive number" }),
  operator: z.enum(["*", "/"]),
  description: z.string().optional(),
});
export const unitDefaultValue = {
  name: "",
  baseUnit: "",
  conversionRatio: 1,
  operator: "",
  description: "",
};
