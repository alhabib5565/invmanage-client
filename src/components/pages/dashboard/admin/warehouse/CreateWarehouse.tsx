import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { FieldValues } from "react-hook-form";
import { districtOpsions, divisionOptions } from "./warehouse.constant";
import MySelectWithWatch from "@/components/from/MySelectWithWatch";
import { useState } from "react";
import MyTextarea from "@/components/from/MyTextarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { warehouseDefaultValue, warehouseSchema } from "./warehouse.validation";
import { useNavigate } from "react-router-dom";
import { useCreateWarehouseMutation } from "@/redux/api/admin/warehouse.api";
import { toast } from "sonner";
const CreateWarehouse = () => {
  const [division, setDivision] = useState("");
  const navigate = useNavigate();

  const [createWarehouse, { isLoading }] = useCreateWarehouseMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createWarehouse(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/warehouse");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(warehouseSchema)}
          defaultValues={warehouseDefaultValue}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyInput name="name" label="Warehouse Name" type="text" />
            <MyInput name="mobileNumber" label="Mobile" type="tel" />
            <MyInput name="email" label="Email" type="text" required={false} />
            <MySelectWithWatch
              onValueChange={setDivision}
              name="division"
              label="Division"
              isSuggestion={true}
              options={divisionOptions}
              placeholder="Search Division"
            />
            <MySelect
              name="district"
              label="District"
              isSuggestion={false}
              options={districtOpsions(division)}
              placeholder="District"
              disabled={!division}
            />
            <MyInput name="zipCode" label="Zip" type="number" />
            <div className="col-span-1 ">
              <MyTextarea name="address" label="Address" rows={2} />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <MyTextarea name="note" label="Note" rows={2} required={false} />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default CreateWarehouse;
