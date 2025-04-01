import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelect from "@/components/from/MySelect";
import ProductSearch from "@/components/myUi/ProductSearch";
import PageHeader from "@/components/shared/PageHeader";
import { Label } from "@/components/ui/label";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { TProductItemWithQuanity } from "../purchase/purchase.type";
import SelectedProductTable from "../purchase/SelectedProductTable";
import OrderSummaryTable from "../purchase/OrderSummaryTable";
import MyInputSuffixWithWatch from "@/components/from/MyInputSuffixWithWatch";
import MyInputWithSuffix from "@/components/from/MyInputWithSuffix";
import { Button } from "@/components/ui/button";

const CreateSales = () => {
  // states
  const [selectedProduct, setSelectedProduct] = useState<
    TProductItemWithQuanity[]
  >([]);
  const [discountAmount, setDiscountAmount] = useState(10);
  const [taxRate, setTaxRate] = useState(0);
  const [shipping, setShipping] = useState(0);

  const onSubmit = (value: FieldValues) => {
    console.log(value);
  };

  const isLoading = false;

  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions();
  return (
    <div className="space-y-6">
      <PageHeader isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          // resolver={zodResolver(purchaseSchema)}
          //   defaultValues={defaultPurchaseValues}
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
              name="customer"
              label="Customer"
              isSuggestion={true}
              options={customerOptions || []}
              placeholder="Search Customer"
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
            <Button disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default CreateSales;
