import MyForm from "@/components/from/MyForm";
import { FieldValues } from "react-hook-form";
import MyInput from "@/components/from/MyInput";
import MyInputWithWatch from "@/components/from/MyInputWithWatch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyTextarea from "@/components/from/MyTextarea";
import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import {
  bookSaleFormDefaultValues,
  bookSaleFormSchema,
} from "./book-sale.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateBookSaleMutation } from "@/redux/api/admin/bookSale.api";
import MySelect from "@/components/from/MySelect";
import useBookOptions from "@/hooks/useBookOptions";
import useEmployeeOptions from "@/hooks/useEmployeeOptions";
import CreateCustomerModal from "./CreateCustomerModal";
import useCustomerOptions from "@/hooks/useCustomerOptions";

const CreateAdminBookSale = () => {
  const [quantitySold, setQuantitySold] = useState<number>(0);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [createBookSale] = useCreateBookSaleMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createBookSale(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/book-sale-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const saleTypeOptions = [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
  ];

  const { bookOptions } = useBookOptions();
  const { employeeNameOptions } = useEmployeeOptions();
  const { customerOptions } = useCustomerOptions();

  return (
    <div className="space-y-6">
      <PageHeader />
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(bookSaleFormSchema)}
        defaultValues={bookSaleFormDefaultValues}
      >
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MySelect
            name="book"
            label="Select Book"
            placeholder="Search Book"
            isSuggestion
            options={bookOptions || []}
          />

          <MySelect
            name="saleBy"
            label="Sale By"
            placeholder="Search sales executive"
            isSuggestion
            options={employeeNameOptions || []}
          />

          <MyInputWithWatch
            name="totalQuantitySold"
            label="Total Quantity Sold"
            type="number"
            placeholder="Enter quantity"
            onValueChange={setQuantitySold}
          />

          <MyInputWithWatch
            name="sellingPricePerUnit"
            label="Selling Price per Unit"
            type="number"
            placeholder="Enter price"
            onValueChange={setSellingPricePerUnit}
          />

          {/* Auto-Calculated Total Sale Amount */}
          <div>
            <Label>Total Sale Amount (Auto-calculated)</Label>
            <Input
              className="mt-2 block bg-transparent"
              name="totalSaleAmount"
              type="text"
              value={((quantitySold || 0) * (sellingPricePerUnit || 0)).toFixed(
                2
              )}
              disabled
            />
          </div>

          <MyInput name="saleDate" label="Sale Date" type="date" />

          <MySelect
            name="saleType"
            label="Sale Type"
            placeholder="Select Sale Type"
            options={saleTypeOptions}
            isSuggestion={false}
          />

          {/* Notes - Full Width */}
          <div className="col-span-1 md:col-span-2">
            <MyTextarea rows={3} name="notes" label="Notes" />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="w-[145px] text-black text-xl font-semibold">
            Customer Info
          </h3>
          <hr className="mb-4" />
          <div className="max-w-xl w-full  flex gap-5 items-end">
            <MySelect
              name="customer"
              label="Select Customer"
              placeholder="Search customer by name"
              isSuggestion
              options={customerOptions || []}
            />
            <Button type="button" onClick={() => setIsOpen(!isOpen)}>
              Create new Customer
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 ">
          <Button type="submit">Save</Button>
        </div>
      </MyForm>
      {isOpen && <CreateCustomerModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default CreateAdminBookSale;
