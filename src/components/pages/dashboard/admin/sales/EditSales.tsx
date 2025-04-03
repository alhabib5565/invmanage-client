/* eslint-disable @typescript-eslint/no-explicit-any */
import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelect from "@/components/from/MySelect";
import ProductSearch from "@/components/myUi/ProductSearch";
import PageHeader from "@/components/shared/PageHeader";
import { Label } from "@/components/ui/label";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { TProductItemWithQuanity } from "../purchase/purchase.type";
import SelectedProductTable from "../purchase/SelectedProductTable";
import OrderSummaryTable from "../purchase/OrderSummaryTable";
import MyInputSuffixWithWatch from "@/components/from/MyInputSuffixWithWatch";
import MyInputWithSuffix from "@/components/from/MyInputWithSuffix";
import { Button } from "@/components/ui/button";
import { salesSchema } from "./sales.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import MyTextarea from "@/components/from/MyTextarea";
import { toast } from "sonner";
import {
  useEditSalesMutation,
  useGetSingleSalesQuery,
} from "@/redux/api/admin/sales.api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/shared/Loading";

const EditSales = () => {
  // states
  const [selectedProduct, setSelectedProduct] = useState<
    TProductItemWithQuanity[]
  >([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [shipping, setShipping] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  //query
  const { data, isLoading } = useGetSingleSalesQuery(id);
  const [editSale, { isLoading: editLoading }] = useEditSalesMutation();

  const purchaseData = data?.data;

  useEffect(() => {
    if (purchaseData?.items?.length > 0) {
      const items = purchaseData?.items?.map((item: any) => ({
        ...item.product,
        quantity: item.quantity,
        product: item?.product?._id,
      }));
      setSelectedProduct([...items]);
    }
  }, [purchaseData]);

  // submit function
  const onSubmit = async (value: FieldValues) => {
    if (selectedProduct.length < 1) {
      return toast.error("Please add product to purchase list");
    }

    const salesDate = {
      ...value,
      items: [...selectedProduct],
    };

    const toastId = toast.loading("Processing your request...");
    try {
      const res = await editSale(salesDate).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/sales-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions();

  if (isLoading) {
    return <Loading />;
  }
  const defaultSaleValues = {
    ...purchaseData,
    discountAmount: String(purchaseData?.discountAmount),
    shipping: String(purchaseData?.shipping),
    paidAmount: String(purchaseData?.paidAmount),
  };

  return (
    <div className="space-y-6">
      <PageHeader isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(salesSchema)}
          defaultValues={defaultSaleValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyDatePicker name="salesDate" label="Date" />
            <MySelect
              name="warehouse"
              label="Warehouse"
              isSuggestion={true}
              options={warehouseOptions || []}
              placeholder="Search Warehouse"
              disabled={true}
            />
            <MySelect
              name="customer"
              label="Customer"
              isSuggestion={true}
              options={customerOptions || []}
              placeholder="Search Customer"
              disabled={true}
            />
          </div>

          {/* product search */}
          <div className="mt-4 space-y-2">
            <Label>Product:</Label>
            <ProductSearch
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          </div>

          {/*selected items table */}
          <div className="mt-4 space-y-2">
            <Label>Items:</Label>

            <SelectedProductTable
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          </div>

          {/* Order Summary table */}
          <OrderSummaryTable
            orderSummary={{
              discountAmount: Number(discountAmount),
              taxRate: Number(taxRate),
              shipping: Number(shipping),
            }}
            selectedProduct={selectedProduct}
          />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <MyInputSuffixWithWatch
              onValueChange={setTaxRate}
              name="taxRate"
              label="Tax Rate"
              suffix="%"
              placeholder="Enter Tax Rate"
              required={false}
            />

            <MyInputSuffixWithWatch
              onValueChange={setDiscountAmount}
              name="discountAmount"
              label="Discount"
              suffix="TK"
              placeholder="Enter Discount Amount"
              required={false}
            />

            <MyInputSuffixWithWatch
              onValueChange={setShipping}
              name="shipping"
              label="Shipping"
              suffix="TK"
              placeholder="Enter Shipping Charge"
              required={false}
            />
            <MyInputWithSuffix
              name="paidAmount"
              label="Paid Amount"
              suffix="TK"
              placeholder="Enter Total Paid Amount"
            />
            <MySelect
              name="paymentStatus"
              label="Payment Status"
              isSuggestion={false}
              options={[
                {
                  label: "Paid",
                  value: "Paid",
                },
                {
                  label: "Partial",
                  value: "Partial",
                },
                {
                  label: "Pending",
                  value: "Pending",
                },
              ]}
              placeholder="Choose Payment Status"
            />
            <MySelect
              name="paymentMethod"
              label="Payment Method"
              isSuggestion={false}
              options={[
                {
                  label: "Cash",
                  value: "Cash",
                },
              ]}
              placeholder="Choose Payment Method"
            />
          </div>
          <div className="col-span-1 lg:col-span-2 mt-4">
            <MyTextarea name="note" label="Note" rows={2} required={false} />
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={editLoading || selectedProduct.length < 1}>
              {editLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default EditSales;
