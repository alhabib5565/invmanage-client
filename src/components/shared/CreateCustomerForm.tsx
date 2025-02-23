import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "sonner";
import { useCreateCustomerMutation } from "@/redux/api/admin/customerManagement.api";

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  mobileNumber: z
    .string()
    .length(11, { message: "Mobile Number must be exactly 11 digits" })
    .regex(/^01\d{9}$/, {
      message: "Mobile Number must start with 01 and contain 11 digits",
    }),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company Name is required"),
  district: z.string().min(1, "District is required"),
  thana: z.string().min(1, "Thana is required"),
  homeAddress: z.string().min(1, "Home Address is required"),
});

const defaultValue = {
  name: "",
  gender: undefined,
  mobileNumber: "",
  email: "",
  companyName: "",
  district: "",
  thana: "",
  homeAddress: "",
};

const CreateCustomerForm = () => {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();

  const onSubmit = async (value: FieldValues) => {
    if (!value.salesExecutiveReference) {
      delete value.salesExecutiveReference;
    }
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createCustomer(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  return (
    <MyForm
      onSubmit={onSubmit}
      resolver={zodResolver(formSchema)}
      defaultValues={defaultValue}
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full">
        <MyInput
          name="name"
          label="Enter Full Name"
          type="text"
          placeholder="Full Name"
        />
        <MySelect
          name="gender"
          label="Select Gender"
          placeholder="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          isSuggestion={false}
        />
        <MyInput
          name="mobileNumber"
          label="Enter Mobile"
          type="tel"
          placeholder="Mobile"
        />
        <MyInput
          name="email"
          label="Enter Email"
          type="email"
          placeholder="Email"
        />
        <MyInput
          name="companyName"
          label="Company Name"
          type="text"
          placeholder="Enter company name"
        />
        <MySelect
          name="district"
          label="Select District"
          placeholder="District"
          options={[{ value: "Sherpur", label: "Sherpur" }]}
          isSuggestion={false}
        />
        <MyInput
          name="thana"
          label="Thana"
          type="text"
          placeholder="Enter Thana"
        />
        <MyInput
          name="homeAddress"
          label="Home address"
          type="text"
          placeholder="Enter Home address"
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="col-span-1 sm:col-span-2"
        >
          {isLoading ? "Submit..." : "Submit"}
        </Button>
      </div>
    </MyForm>
  );
};
export default CreateCustomerForm;
