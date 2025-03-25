/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEditPurchasesMutation,
  useGetSinglePurchasesQuery,
} from "@/redux/api/admin/purchase.api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { FieldValues } from "react-hook-form";

import { TProductItemWithQuanity } from "./purchase.type";
import SelectedProductTable from "./SelectedProductTable";
import ProductSearch from "@/components/myUi/ProductSearch";

import OrderSummaryTable from "./OrderSummaryTable";
import MyInputWithSuffix from "@/components/from/MyInputWithSuffix";
import { zodResolver } from "@hookform/resolvers/zod";
import { purchaseSchema } from "./purchase.validation";
import Loading from "@/components/shared/Loading";
import MyInputSuffixWithWatch from "@/components/from/MyInputSuffixWithWatch";
import { toast } from "sonner";

const EditPurchase = () => {
  // states
  const [selectedProduct, setSelectedProduct] = useState<
    TProductItemWithQuanity[]
  >([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [shipping, setShipping] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSinglePurchasesQuery(id);
  const [editPurchase, { isLoading: editLoading }] = useEditPurchasesMutation();

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

  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions(); // it will replace with supplier options

  const onSubmit = async (value: FieldValues) => {
    if (selectedProduct.length < 1) {
      return toast.error("Please add product to purchase list");
    }

    const purchaseDate = {
      ...value,
      discountAmount: Number(value.discountAmount),
      taxRate: Number(value.taxRate),
      shipping: Number(value.shipping),
      items: [...selectedProduct],
    };
    console.log(purchaseDate);

    const toastId = toast.loading("Processing your request...");
    try {
      const res = await editPurchase({ data: purchaseDate, id: id }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/purchase-list");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  const defaultPurchaseValues = {
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
          resolver={zodResolver(purchaseSchema)}
          defaultValues={defaultPurchaseValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyDatePicker name="purchaseDate" label="Date" />
            <MySelect
              name="warehouse"
              label="Warehouse"
              isSuggestion={true}
              options={warehouseOptions || []}
              placeholder="Search Warehouse"
            />
            <MySelect
              name="supplier"
              label="Supplier"
              isSuggestion={true}
              options={customerOptions || []}
              placeholder="Search Supplier"
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

          {/* items table */}
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

          {/* order summary input */}

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
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={editLoading}>
              {editLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default EditPurchase;
