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

const CreatePurchaseRetrun = () => {
  const [selectedPurchase, setSelectedPurchase] = useState<
    TPurchaseProductItem[] | null
  >(null);

  const [warehouse, setWarehouse] = useState("");
  const [supplier, setSupplier] = useState("");

  const isLoading = false;
  const onSubmit = (value: FieldValues) => {
    console.log({ value, returnItems: selectedPurchase });
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
            <MyDatePicker name="purchaseRetrunDate" label="Date" />
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
