import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelect from "@/components/from/MySelect";
import MyAutoComplete from "@/components/myUi/MyAutoComplete";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import useDebounce from "@/hooks/useDebounce";
import useWarehouseOptions from "@/hooks/useWarehouseOptons";
import { useGetAllProductsQuery } from "@/redux/api/admin/product.api";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Minus, Pen, Plus } from "lucide-react";
import { TPurchaseProductItemWithProduct } from "./purchase.type";

const CreatePurchase = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<
    TPurchaseProductItemWithProduct[]
  >([]);
  console.log(selectedProduct);
  const searchTerm = useDebounce({ value: inputValue });

  const handleUpdateQuantiy = (
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

  const { data } = useGetAllProductsQuery(
    {
      searchTerm,
    },
    {
      skip: !searchTerm,
    }
  );

  const onSubmit = (value: FieldValues) => {
    console.log(value);
  };

  const { warehouseOptions } = useWarehouseOptions();
  const { customerOptions } = useCustomerOptions(); // it will replace with supplier options

  return (
    <div className="space-y-6">
      <PageHeader isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm onSubmit={onSubmit}>
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
            <MyAutoComplete
              inputValue={inputValue}
              setInputValue={setInputValue}
              data={data?.data}
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          </div>

          {/* items table */}
          <div className="relative h-fit max-h-[500px] overflow-y-scroll">
            <Table className="border-b">
              <TableHeader className="bg-secondary sticky top-0 z-10 ">
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Net Price</TableHead>
                  <TableHead>Quantiy</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Sub Total</TableHead>

                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProduct?.map(
                  (product: TPurchaseProductItemWithProduct) => {
                    return (
                      <TableRow key={product._id}>
                        <TableCell className="space-y-1">
                          <h1 className="text-[1rem] font-[500]">
                            {product?.productName}
                          </h1>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#cef2e3] text-[#0ac074]">
                              {product?.code}
                            </Badge>
                            <Badge className="p-1 bg-[#e0e3ff] text-primary">
                              <Pen strokeWidth="3" size={16} />
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell>{product.productCost} TK</TableCell>
                        <TableCell>
                          <Badge className="bg-[#fff1d3] text-[#ffb821]">
                            {product?.stock.reduce(
                              (prevValue, currentValue) => {
                                return (prevValue += currentValue.quantity);
                              },
                              0
                            )}
                            {product.productUnit.name}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {product.netUnitPrice}
                          TK
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            <Button
                              onClick={() =>
                                handleUpdateQuantiy(product, "add")
                              }
                              className="rounded-r-none"
                            >
                              <Plus size={16} strokeWidth={3} />
                            </Button>
                            <span className="border w-10 grid place-items-center">
                              {product.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                handleUpdateQuantiy(product, "minus")
                              }
                              className="rounded-l-none"
                            >
                              <Minus size={16} strokeWidth={3} />
                            </Button>
                          </div>
                        </TableCell>

                        <TableCell>{product?.discount || "0.0"} TK</TableCell>
                        <TableCell>{product.taxAmount} TK</TableCell>
                        <TableCell>
                          {product.subTotal}
                          TK
                        </TableCell>
                        <TableCell>{product.productPrice} TK</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
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
