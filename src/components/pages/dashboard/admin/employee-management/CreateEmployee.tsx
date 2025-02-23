import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import {
  createEmployeeDefaultValue,
  createEmployeeSchema,
} from "./validationSchema";
import PageHeader from "@/components/shared/PageHeader";
import { useNavigate } from "react-router-dom";
import { useCreateEmployeeMutation } from "@/redux/api/admin/userManagement.api";
import { toast } from "sonner";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [createEmployee] = useCreateEmployeeMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createEmployee(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/employee-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader />
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(createEmployeeSchema)}
        defaultValues={createEmployeeDefaultValue}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Employee Name */}
          <MyInput name="employeeName" label="Employee Name" type="text" />

          {/* Contact Number */}
          <MyInput name="mobileNumber" label="Contact Number" type="tel" />

          {/* Contact Number */}
          <MyInput
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            type="tel"
          />

          {/* Email */}
          <MyInput name="email" label="Email" type="email" />

          {/* Joining Date */}
          <MyInput
            name="birthDate"
            label="Birth Date"
            type="date"
            required={false}
          />

          {/* Role */}
          <MySelect
            name="role"
            label="Select Role"
            placeholder="Role"
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "Sales Executive",
                value: "sales-executive",
              },
            ]}
            isSuggestion={false}
          />

          {/* Department */}
          <MyInput name="department" label="Department" type="text" />

          <MyInput name="designation" label="Designation" type="text" />

          {/* Work Shift */}
          <MySelect
            name="workShift"
            label="Work Shift"
            placeholder="Work Shift"
            options={[
              {
                label: "Morning",
                value: "Morning",
              },
              {
                label: "Evening",
                value: "Evening",
              },
              {
                label: "Night",
                value: "Night",
              },
            ]}
            isSuggestion={false}
          />
          {/* Joining Date */}
          <MyInput name="joiningDate" label="Joining Date" type="date" />

          {/* Employee Status */}
          <MySelect
            name="employeeStatus"
            label="Employee Status"
            placeholder="Employee Status"
            options={[
              {
                label: "Active",
                value: "Active",
              },
              {
                label: "Inactive",
                value: "Inactive",
              },
              {
                label: "On Leave",
                value: "On Leave",
              },
            ]}
            isSuggestion={false}
          />
          <MyInput
            name="password"
            label="Enter Password"
            type="password"
            placeholder="Password"
          />

          <MyInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button type="submit" className="mt-4 btn btn-primary">
          Submit
        </Button>
      </MyForm>
    </div>
  );
};
export default CreateEmployee;
