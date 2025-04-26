import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelectWithWatch from "@/components/from/MySelectWithWatch";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { TPurchaseProductItem } from "../purchase/purchase.type";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import SelectedPurchaseTable from "../purchaseReturn/SelectedPurchaseTable";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllSalesQuery } from "@/redux/api/admin/sales.api";
import { useCreateSalesRetrunMutation } from "@/redux/api/admin/salesRetrun.api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultSaleseRetrunValues,
  salesReturnSchema,
} from "./salesReturn.validation";
import { TSalesItem } from "../sales/sales.type";
import SalesAndPurchaseSearch from "../admin-shared/SalesAndPurchaseSearch";

const CreateSalesRetrun = () => {
  const [selectedSales, setSelectedSales] = useState<
    TSalesItem[] | TPurchaseProductItem[] | null
  >(null);
  const [inputValue, setInputValue] = useState("");
  const [sales_ID, setSales_ID] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [customer, setCustomer] = useState("");
  const searchTerm = useDebounce({ value: inputValue });

  const { data, isFetching: salesSearchLoading } = useGetAllSalesQuery(
    { customer, warehouse, searchTerm },
    {
      skip: !customer || !warehouse || !searchTerm,
    }
  );

  const navigate = useNavigate();

  const [createPurchaseReturn, { isLoading }] = useCreateSalesRetrunMutation();

  const onSubmit = async (value: FieldValues) => {
    if (!selectedSales || selectedSales.length < 1) {
      return toast.error("Please add product to sales list");
    }

    const salesRetrunDate = {
      ...value,
      returnItems: [...selectedSales],
      sale: sales_ID,
    };
    console.log(salesRetrunDate);

    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createPurchaseReturn(salesRetrunDate).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/sales-return-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };
  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions();

  const isSelectedPurchaseExist =
    selectedSales && selectedSales.length > 0 ? true : false;
  return (
    <div className="space-y-6">
      <PageHeader pageTitle="Create Purchase Return" isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(salesReturnSchema)}
          defaultValues={defaultSaleseRetrunValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyDatePicker name="returnDate" label="Date" />
            <MySelectWithWatch
              onValueChange={setWarehouse}
              name="warehouse"
              label="Warehouse"
              isSuggestion={false}
              options={warehouseOptions || []}
              disabled={warehouse && isSelectedPurchaseExist ? true : false}
              placeholder="Search Warehouse"
            />
            <MySelectWithWatch
              onValueChange={setCustomer}
              name="customer"
              label="Customer"
              isSuggestion={true}
              options={customerOptions || []}
              disabled={customer && isSelectedPurchaseExist ? true : false}
              placeholder="Search Customer"
            />
          </div>
          {/* product search */}
          <div className="mt-4 space-y-2">
            <Label>Sales:</Label>
            <SalesAndPurchaseSearch
              data={data?.data || []}
              isLoading={salesSearchLoading}
              inputValue={inputValue}
              setInputValue={setInputValue}
              selectedItem={setSelectedSales}
              setItem_ID={setSales_ID}
              disabled={!warehouse || !customer}
              placeholder="Sales search by sales ID"
            />
          </div>

          {/* items table */}
          <div className="mt-4 space-y-2">
            <Label>Items:</Label>

            <SelectedPurchaseTable
              setSelectedPurcaseItem={setSelectedSales}
              selectedPurchaseItem={selectedSales}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={isLoading || !selectedSales}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default CreateSalesRetrun;
