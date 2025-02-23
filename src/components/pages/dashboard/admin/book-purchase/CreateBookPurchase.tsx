import MyForm from "@/components/from/MyForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import {
  bookPurchaseDefaultValue,
  bookPurchaseSchema,
} from "./validationSchema";
import MyInput from "@/components/from/MyInput";
import PageHeader from "@/components/shared/PageHeader";
import { useState } from "react";
import MyInputWithWatch from "@/components/from/MyInputWithWatch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MyTextarea from "@/components/from/MyTextarea";
import { useNavigate } from "react-router-dom";
import { useCreateBookPurchaseMutation } from "@/redux/api/admin/bookPurchase.api";
import { toast } from "sonner";
import MySelect from "@/components/from/MySelect";
import useBookOptions from "@/hooks/useBookOptions";

const CreateBookPurchase = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);

  const navigate = useNavigate();

  const [createEmployee] = useCreateBookPurchaseMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createEmployee(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/book-purchase-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const { bookOptions } = useBookOptions();

  return (
    <div className="space-y-6">
      <PageHeader />
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(bookPurchaseSchema)}
        defaultValues={bookPurchaseDefaultValue}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MySelect
            name="book"
            label="Select Book"
            placeholder="Search Book"
            isSuggestion
            options={bookOptions || []}
          />{" "}
          <MyInput name="author" label="Author" type="text" required={false} />
          <MyInput
            name="publisher"
            label="Publisher"
            type="text"
            required={false}
          />
          <MyInputWithWatch
            name="quantityPurchased"
            label="Quantity Purchased"
            type="number"
            placeholder="Enter quantity"
            onValueChange={setQuantity}
          />
          <MyInputWithWatch
            name="purchasePricePerUnit"
            label="Purchase Price per Unit"
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
          <MyInput
            name="supplierName"
            label="Supplier Name"
            type="text"
            required={false}
          />
          <MyInput name="purchaseDate" label="Purchase Date" type="date" />
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

export default CreateBookPurchase;
