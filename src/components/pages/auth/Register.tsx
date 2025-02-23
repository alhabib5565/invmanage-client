import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, { message: "Name must be at least 3 characters long" }),

  role: z.string({
    required_error: "Role is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const defaultValue = {
  name: "",
  role: "",
  email: "",
  password: "",
};

const Register = () => {
  const onSubmit = (value: FieldValues) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col gap-10 py-10 justify-center items-center min-h-screen h-full ">
      <div className="p-6 border max-w-[600px] w-full min-w-[250px] rounded-[30px] bg-gray-50">
        <h3 className="text-center text-xl font-semibold mb-6">Register</h3>
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(formSchema)}
          defaultValues={defaultValue}
        >
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full">
            <MyInput
              name="full-name"
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
              name="mobile"
              label="Enter Mobile"
              type="number"
              placeholder="Mobile"
            />
            <MyInput
              name="email"
              label="Enter Email"
              type="email"
              placeholder="Email"
            />
            <MyInput
              name="company-name"
              label="Company Name"
              type="text"
              placeholder="Enter company name"
            />
            <MyInput
              name="password"
              label="Enter Password"
              type="password"
              placeholder="Password"
            />
            <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-4">
              <MySelect
                name="district"
                label="Select District"
                placeholder="District"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                isSuggestion={false}
              />
              <MyInput
                name="thana"
                label="Thana"
                type="text"
                placeholder="Enter Thana"
              />
            </div>
            <MyInput
              name="home-address"
              label="Home address"
              type="text"
              placeholder="Enter Home address"
            />
            <MyInput
              name="sales-executive-reference"
              label="Sales Executive Reference"
              type="text"
              placeholder="Sales Executive Reference"
              required={false}
            />
            <Button className="col-span-1 sm:col-span-2">Sign In</Button>
          </div>
        </MyForm>
      </div>
      <p className="text-lg leading-[38.40px] tracking-tight">
        <span className="text-[#344054]">Already have an account? </span>{" "}
        <Link to="/login" className="text-[#0056b3]">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default Register;
