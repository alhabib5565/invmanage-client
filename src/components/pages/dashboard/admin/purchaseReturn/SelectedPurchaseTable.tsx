/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TPurchaseProductItem } from "../purchase/purchase.type";
import { calculateProductTotals } from "../purchase/purcase.utils";
type TSelectProductTableProps = {
  setSelectedPurcaseItem: React.Dispatch<
    React.SetStateAction<TPurchaseProductItem[] | null>
  >;
  selectedPurchaseItem: TPurchaseProductItem[] | null;
};

const SelectedPurchaseTable = ({
  selectedPurchaseItem,
  setSelectedPurcaseItem,
}: TSelectProductTableProps) => {
  //
  const handleIncreaseQuantity = (
    productId: string,
    quantityChange: number
  ) => {
    if (!selectedPurchaseItem?.length) {
      return;
    }
    const nextPurchaseItem = selectedPurchaseItem.map((purchaseItem) => {
      if (purchaseItem.product === productId) {
        const newQuantity = purchaseItem.quantity + quantityChange;
        if (newQuantity < 1) return purchaseItem;
        const { subTotal, netUnitPrice, taxAmount } =
          // @ts-ignore
          calculateProductTotals({ ...purchaseItem, quantity: newQuantity });
        return {
          ...purchaseItem,
          quantity: newQuantity,
          subTotal,
          taxAmount,
          netUnitPrice,
        };
      } else {
        return purchaseItem;
      }
    });

    setSelectedPurcaseItem(nextPurchaseItem);
  };

  const handleDeleteProduct = (product_id: string) => {
    if (!selectedPurchaseItem?.length) {
      return;
    }
    const filteredProduct = selectedPurchaseItem.filter(
      (product) => product.product !== product_id
    );
    setSelectedPurcaseItem(filteredProduct);
  };

  return (
    <div className="relative h-fit max-h-[500px] overflow-y-scroll">
      <Table className="border-b">
        <TableHeader className="bg-secondary sticky top-0 z-10 ">
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Net Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Sub Total</TableHead>

            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        {selectedPurchaseItem && selectedPurchaseItem.length > 0 && (
          <TableBody>
            {selectedPurchaseItem?.map((product: TPurchaseProductItem) => {
              return (
                <TableRow key={product.product}>
                  <TableCell className="space-y-1">
                    <h1 className="text-[1rem] font-[500]">
                      {product?.productName}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#cef2e3] text-[#0ac074]">
                        {product?.code}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell>{product.productCost} TK</TableCell>

                  <TableCell>
                    {product.netUnitPrice.toFixed(2)}
                    TK
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <Button
                        type="button"
                        onClick={() =>
                          handleIncreaseQuantity(product.product, 1)
                        }
                        className="rounded-r-none"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </Button>
                      <span className="border w-10 grid place-items-center">
                        {product.quantity}
                      </span>
                      <Button
                        type="button"
                        onClick={() =>
                          handleIncreaseQuantity(product.product, -1)
                        }
                        className="rounded-l-none"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>{product?.discountAmount} TK</TableCell>
                  <TableCell>
                    ({product.productTaxRate}%) {product.taxAmount.toFixed(2)}{" "}
                    TK
                  </TableCell>
                  <TableCell>{product.subTotal.toFixed(2)} TK</TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-100"
                      onClick={() => handleDeleteProduct(product.product)}
                    >
                      <Trash2 strokeWidth={2.8} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell>Total Return Amount</TableCell>

              <TableCell></TableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                {selectedPurchaseItem
                  ?.reduce((prev, current) => {
                    const { subTotal } = current;
                    return (prev += subTotal);
                  }, 0)
                  .toFixed(2)}{" "}
                TK
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {!selectedPurchaseItem?.length && (
        <div className="h-16 grid place-items-center ">No Data Available</div>
      )}
    </div>
  );
};

export default SelectedPurchaseTable;
