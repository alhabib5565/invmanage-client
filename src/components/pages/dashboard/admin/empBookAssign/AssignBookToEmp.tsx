import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import MyTextarea from "@/components/from/MyTextarea";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import MyInputWithWatch from "@/components/from/MyInputWithWatch";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useCreateEmpBookAssignMutation } from "@/redux/api/admin/empBookAssign.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookAssignDefaultValue,
  bookAssignSchema,
} from "./empBookAsssig.validation";
import useEmployeeOptions from "@/hooks/useEmployeeOptions";
import useBookOptions from "@/hooks/useBookOptions";

const AssignBookToEmp = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const navigate = useNavigate();

  const [createEmployee] = useCreateEmpBookAssignMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createEmployee(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/assign-book-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const { employeeNameOptions } = useEmployeeOptions();
  const { bookOptions } = useBookOptions();

  return (
    <div className="space-y-6">
      <PageHeader />
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(bookAssignSchema)}
        defaultValues={bookAssignDefaultValue}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MySelect
            name="book"
            label="Select Book"
            placeholder="Search Book"
            isSuggestion
            options={bookOptions || []}
          />{" "}
          <MySelect
            name="employee"
            label="Employee"
            placeholder="Employee"
            options={employeeNameOptions || []}
            isSuggestion={true}
          />
          <MyInputWithWatch
            name="quantityAssigned"
            label="Quantity Assigned"
            type="number"
            placeholder="Enter Assinged Quantity"
            onValueChange={setQuantity}
          />
          <MyInputWithWatch
            name="pricePerUnit"
            label="Price per Unit"
            type="number"
            placeholder="Enter price"
            onValueChange={setPricePerUnit}
          />
          <div>
            <Label>Total Price (Auto-calculated)</Label>
            <Input
              className="mt-2 block bg-transparent"
              name="totalPurchaseCost"
              type="text"
              value={((quantity || 0) * (pricePerUnit || 0)).toFixed(2)}
              disabled
            />
          </div>
          <MyInput name="assignDate" label="Assigned Date" type="date" />
        </div>

        {/* Notes - Full Width */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
          <MyTextarea rows={3} name="notes" label="Notes" required={false} />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <Button type="submit">Save</Button>
        </div>
      </MyForm>
    </div>
  );
};

export default AssignBookToEmp;
