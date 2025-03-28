import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelectWithWatch from "@/components/from/MySelectWithWatch";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import PurchaseReturnProductSearch from "./PurchaseReturnProductSearch";
import { Label } from "@/components/ui/label";
import { TPurchaseProductItem } from "../purchase/purchase.type";
import SelectedPurchaseTable from "./SelectedPurchaseTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseRetrunSchema } from "./pruchaseRetrun.validation";
import { defaultPurchaseValues } from "../purchase/purchase.validation";
import { toast } from "sonner";
import { useCreatePurchaseRetrunMutation } from "@/redux/api/admin/purchaseReturn.api";
import { useNavigate } from "react-router-dom";

const CreatePurchaseRetrun = () => {
  const [selectedPurchase, setSelectedPurchase] = useState<
    TPurchaseProductItem[] | null
  >(null);
  const [purchase_ID, setPurchase_ID] = useState("");

  const [warehouse, setWarehouse] = useState("");
  const [supplier, setSupplier] = useState("");

  const navigate = useNavigate();

  const [createPurchaseReturn, { isLoading }] =
    useCreatePurchaseRetrunMutation();

  const onSubmit = async (value: FieldValues) => {
    if (!selectedPurchase || selectedPurchase.length < 1) {
      return toast.error("Please add product to purchase list");
    }

    const purchaseRetrunDate = {
      ...value,
      returnItems: [...selectedPurchase],
      purchase: purchase_ID,
    };
    console.log(purchaseRetrunDate);

    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createPurchaseReturn(purchaseRetrunDate).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/purchase-return-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };
  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions(); // it will replace with supplier options

  const isSelectedPurchaseExist =
    selectedPurchase && selectedPurchase.length > 0 ? true : false;
  return (
    <div className="space-y-6">
      <PageHeader pageTitle="Create Purchase Return" isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(purchaseRetrunSchema)}
          defaultValues={defaultPurchaseValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyDatePicker name="returnDate" label="Date" />
            <MySelectWithWatch
              onValueChange={setWarehouse}
              name="warehouse"
              label="Warehouse"
              isSuggestion={true}
              options={warehouseOptions || []}
              disabled={warehouse && isSelectedPurchaseExist ? true : false}
              placeholder="Search Warehouse"
            />
            <MySelectWithWatch
              onValueChange={setSupplier}
              name="supplier"
              label="Supplier"
              isSuggestion={true}
              options={customerOptions || []}
              disabled={supplier && isSelectedPurchaseExist ? true : false}
              placeholder="Search Supplier"
            />
          </div>
          {/* product search */}
          <div className="mt-4 space-y-2">
            <Label>Purchase:</Label>
            <PurchaseReturnProductSearch
              warehouse={warehouse}
              supplier={supplier}
              selectedPurchase={setSelectedPurchase}
              setPurchase_ID={setPurchase_ID}
            />
          </div>

          {/* items table */}
          <div className="mt-4 space-y-2">
            <Label>Items:</Label>

            <SelectedPurchaseTable
              setSelectedPurcaseItem={setSelectedPurchase}
              selectedPurchaseItem={selectedPurchase}
            />
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

export default CreatePurchaseRetrun;
