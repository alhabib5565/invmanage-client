import * as z from "zod";

export const warehouseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Warehouse name must be at least 3 characters." }),
  mobileNumber: z.string().refine((val) => /^01[3-9]\d{8}$/.test(val), {
    message: "Invalid mobile number. Must be 11 digits and start with 013-019.",
  }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .optional()
    .or(z.literal("")),
  division: z.string().min(1, { message: "Please select a division." }),
  district: z.string().min(1, { message: "Please select a district." }),
  zipCode: z.union([z.string(), z.number()]).refine(
    (val) => {
      const num = typeof val === "string" ? Number(val) : val;
      return !isNaN(num) && Number.isInteger(num) && num >= 1000 && num <= 9999;
    },
    {
      message: "Zip code must be a valid 4-digit number",
    }
  ),
  // zipCode: z.string().refine((val) => /^\d{4}$/.test(val), {
  //   message: "Zip code must be a 4-digit number.",
  // }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  note: z.string().optional().or(z.literal("")),
});

export const warehouseDefaultValue = {
  name: "",
  mobileNumber: "",
  email: "",
  division: "",
  district: "",
  zipCode: "",
  address: "",
  note: "",
};
