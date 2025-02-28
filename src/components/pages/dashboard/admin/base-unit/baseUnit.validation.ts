import { z } from "zod";

export const baseUnitFormSchema = z.object({
  name: z.string().min(1, "Base unit name is required"),
  description: z.string().optional(),
});
