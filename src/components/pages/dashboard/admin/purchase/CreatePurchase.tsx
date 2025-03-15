import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { TProductItemWithQuanity } from "./purchase.type";
import SelectedProductTable from "./SelectedProductTable";
import ProductSearch from "@/components/myUi/ProductSearch";

import OrderSummary from "./OrderSummary";
import OrderSummaryTable from "./OrderSummaryTable";
import { toast } from "sonner";
import MyInputWithSuffix from "@/components/from/MyInputWithSuffix";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultPurchaseValues, purchaseSchema } from "./purchase.validation";

export type TOrderSummary = {
  taxRate: number;
  discount: number;
  shipping: number;
};

const CreatePurchase = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    TProductItemWithQuanity[]
  >([]);
  const [orderSummary, setOrderSummary] = useState({
    taxRate: 0,
    discount: 0,
    shipping: 0,
  });

  const onSubmit = (value: FieldValues) => {
    if (selectedProduct.length < 1) {
      return toast.error("Please add product to purchase list");
    }

    const purchaseDate = {
      ...value,
      items: [...selectedProduct],
      ...orderSummary,
    };
    console.log(purchaseDate);
  };

  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions(); // it will replace with supplier options

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
            orderSummary={orderSummary}
            selectedProduct={selectedProduct}
          />

          {/* order summary input */}
          <OrderSummary setOrderSummary={setOrderSummary} />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
            <MyInputWithSuffix
              name="paidAmount"
              label="Paid Amount*"
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
            <Button>Save</Button>
            {/* <Button disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button> */}
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default CreatePurchase;

/**
 * const handleUpdateQuantity = (
    porductItem: TPurchaseProductItemWithProduct,
    quantityUpdateType: "add" | "minus"
  ) => {
    const alreadySelectedProducts = [...selectedProduct];

    const product = alreadySelectedProducts.find(
      (product) => product._id === porductItem._id
    );
    if (!product) return;

    const newQuantity =
      quantityUpdateType === "add"
        ? product.quantity + 1
        : Math.max(1, product.quantity - 1);

    product.quantity = newQuantity;

    product.taxAmount = product.quantity * product.tax;
    product.subTotal =
      product.quantity * (product.netUnitPrice + product.taxRate);

    setSelectedProduct(alreadySelectedProducts);
  };

 */
