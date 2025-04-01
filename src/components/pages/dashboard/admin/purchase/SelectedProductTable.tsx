import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Minus, Pen, Plus, Trash2 } from "lucide-react";
import { TProductItemWithQuanity } from "./purchase.type";
import { Button } from "@/components/ui/button";
import { calculateProductTotals } from "./purcase.utils";
type TSelectProductTableProps = {
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<TProductItemWithQuanity[]>
  >;
  selectedProduct: TProductItemWithQuanity[];
};
const SelectedProductTable = ({
  selectedProduct,
  setSelectedProduct,
}: TSelectProductTableProps) => {
  const handleUpdateQuantity = (
    productItem: TProductItemWithQuanity,
    quantityUpdateType: "add" | "minus"
  ) => {
    const alreadySelectedProducts = [...selectedProduct];

    const product = alreadySelectedProducts?.find(
      (product) => product._id === productItem._id
    );
    if (!product) return;

    const newQuantity =
      quantityUpdateType === "add"
        ? product.quantity + 1
        : Math.max(1, product.quantity - 1);

    product.quantity = newQuantity;

    setSelectedProduct([...alreadySelectedProducts]);
  };

  const handleDeleteProduct = (product_id: string) => {
    const filteredProduct = selectedProduct.filter(
      (product) => product._id !== product_id
    );
    setSelectedProduct(filteredProduct);
  };
  return (
    <div className="relative h-fit max-h-[500px] overflow-y-scroll">
      <Table className="border-b">
        <TableHeader className="bg-secondary sticky top-0 z-10 ">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Net Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Sub Total</TableHead>

            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct?.map((product: TProductItemWithQuanity) => {
            const { taxAmount, subTotal, netUnitPrice } =
              calculateProductTotals(product);

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
                    {product?.stock?.reduce((prevValue, currentValue) => {
                      return (prevValue += currentValue.quantity);
                    }, 0)}
                    {product.productUnit.name}
                  </Badge>
                </TableCell>

                <TableCell>
                  {netUnitPrice}
                  TK
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Button
                      type="button"
                      onClick={() => handleUpdateQuantity(product, "add")}
                      className="rounded-r-none"
                    >
                      <Plus size={16} strokeWidth={3} />
                    </Button>
                    <span className="border w-10 grid place-items-center">
                      {product.quantity}
                    </span>
                    <Button
                      type="button"
                      onClick={() => handleUpdateQuantity(product, "minus")}
                      className="rounded-l-none"
                    >
                      <Minus size={16} strokeWidth={3} />
                    </Button>
                  </div>
                </TableCell>

                <TableCell>
                  {(product?.discountAmount || 0) * product.quantity} TK
                </TableCell>
                <TableCell>
                  ({product.productTaxRate}%) {taxAmount} TK
                </TableCell>
                <TableCell>
                  {subTotal}
                  TK
                </TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-100"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <Trash2 strokeWidth={2.8} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SelectedProductTable;
