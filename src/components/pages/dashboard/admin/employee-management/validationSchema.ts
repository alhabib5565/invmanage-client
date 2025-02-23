import { z } from "zod";

export const createEmployeeSchema = z
  .object({
    employeeName: z.string().min(1, { message: "Employee Name is required" }),
    mobileNumber: z
      .string()
      .length(11, { message: "Mobile Number must be exactly 11 digits" })
      .regex(/^01\d{9}$/, {
        message: "Mobile Number must start with 01 and contain 11 digits",
      }),
    emergencyContactNumber: z
      .string()
      .length(11, {
        message: "Emergency Contact Number must be exactly 11 digits",
      })
      .regex(/^01\d{9}$/, {
        message:
          "Emergency Contact Number must start with 01 and contain 11 digits",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    role: z.string().min(1, { message: "Role is required" }),
    department: z.string().min(1, { message: "Department is required" }),
    designation: z.string({
      required_error: "Designation is required",
    }),
    workShift: z.string().min(1, { message: "Work Shift is required" }),
    joiningDate: z.string().min(1, { message: "Joining Date is required" }),
    birthDate: z.string().optional(),
    employeeStatus: z
      .string()
      .min(1, { message: "Employee Status is required" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password should be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const createEmployeeDefaultValue = {
  employeeName: "Al-Habib",
  mobileNumber: "01405468432",
  emergencyContactNumber: "01405468432",
  email: "a@gmail.com",
  role: "admin",
  department: "Department",
  designation: "designation",
  workShift: "Morning",
  joiningDate: "",
  birthDate: "",
  employeeStatus: "Active",
  password: "123456",
  confirmPassword: "123456",
};
