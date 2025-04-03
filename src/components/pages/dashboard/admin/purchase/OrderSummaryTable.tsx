import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TOrderSummary } from "./CreatePurchase";
import { TProductItemWithQuanity } from "./purchase.type";
import { calculateProductTotals } from "./purcase.utils";

const OrderSummaryTable = ({
  orderSummary,
  selectedProduct,
}: {
  orderSummary: TOrderSummary;
  selectedProduct: TProductItemWithQuanity[];
}) => {
  const sumOfAllSubTotal = selectedProduct?.reduce((prev, current) => {
    const { subTotal } = calculateProductTotals(current);
    return (prev += subTotal);
  }, 0);

  const totalTax =
    (sumOfAllSubTotal - orderSummary?.discountAmount) *
    (orderSummary.taxRate / 100);

  const grandTotal =
    sumOfAllSubTotal +
    totalTax +
    orderSummary.shipping -
    orderSummary.discountAmount;
  return (
    <div className="flex justify-end mt-8">
      <Table className="border max-w-[400px] w-full">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Tax Rate</TableCell>
            <TableCell>
              TK {totalTax.toFixed(2)} ({orderSummary.taxRate}) %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Discount</TableCell>
            <TableCell>{orderSummary.discountAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Shipping</TableCell>
            <TableCell>{orderSummary.shipping}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Grand Total</TableCell>
            <TableCell>{grandTotal.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderSummaryTable;
