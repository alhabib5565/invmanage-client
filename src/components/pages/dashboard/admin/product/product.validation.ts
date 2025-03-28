import * as z from "zod";

// Zod Validation Schema with all fields required
export const productSchema = z.object({
  productName: z.string().min(1, { message: "Product name is required" }),
  code: z.string().min(1, { message: "Product Code is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  productUnit: z.string().min(1, { message: "Product unit is required" }),
  purchaseUnit: z.string().min(1, { message: "Purchase unit is required" }),
  saleUnit: z.string().min(1, { message: "Sale unit is required" }),
  productCost: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed > 0; // Check if it's a number and greater than 0
    },
    {
      message: "Product cost must be a number greater than 0",
    }
  ),
  productPrice: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed > 0; // Check if it's a number and greater than 0
    },
    {
      message: "Product price must be a number greater than 0",
    }
  ),
  productTaxRate: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed >= 0; // Check if it's a number and greater than or equal to 0
    },
    {
      message: "Tax must be a number greater than or equal to 0",
    }
  ),
  discountAmount: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === null || val === "") {
          return true;
        }
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0;
      },
      {
        message: "Tax must be a number greater than or equal to 0",
      }
    ),
  taxType: z.enum(["inclusive", "exclusive"]),
  stockAlert: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed >= 0; // Check if it's a number and greater than or equal to 0
    },
    {
      message: "Stock alert must be a number greater than or equal to 0",
    }
  ),
  note: z.string().optional(), // Note is still optional
  images: z.array(z.any()).optional(), // images are still optional
});
export const productEditSchema = z.object({
  productName: z.string().min(1, "Product Name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  productUnit: z.string().min(1, "Product Unit is required"),
  purchaseUnit: z.string().min(1, "Purchase Unit is required"),
  saleUnit: z.string().min(1, "Sale Unit is required"),
  note: z.string().optional(),
});

// Empty Default Value Object
export const productDefaultValues = {
  productName: "",
  code: "",
  brand: "",
  category: "",
  productUnit: "",
  purchaseUnit: "",
  saleUnit: "",
  productCost: "",
  productPrice: "",
  discountAmount: "",
  productTaxRate: "",
  taxType: "inclusive", // or "Exclusive" depending on your default
  stockAlert: "",
  note: "",
  images: [],
};
