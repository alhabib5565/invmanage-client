import PageHeader from "@/components/shared/PageHeader";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/myUi/MyPagination";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { deleteConfirmation } from "@/utils/deleteConfirmation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  useDeletePurchaseMutation,
  useGetAllPurchasesQuery,
} from "@/redux/api/admin/purchase.api";
import Loading from "@/components/shared/Loading";
import { TPurchase } from "./purchase.type";
import { Badge } from "@/components/ui/badge";

const PurchaseList = () => {
  const { data, isLoading } = useGetAllPurchasesQuery({});
  const [deletePurchase] = useDeletePurchaseMutation();
  if (isLoading) return <Loading />;
  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-purchase" />
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-end gap-4 ">
          <Input placeholder="Search..." className="w-fit" />
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Purchased On</TableHead>
                <TableHead>Grand Total</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Paid Amount</TableHead>

                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((purchase: TPurchase) => (
                <TableRow key={purchase._id}>
                  <TableCell>
                    <span className="px-3 py-1 rounded bg-[#FDD4DA] text-sm text-[#F62951]">
                      {purchase.purchaseId}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {"purchase.supplier"}
                  </TableCell>
                  <TableCell>{"purchase.warehouse"}</TableCell>
                  <TableCell>{"status"}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {purchase?.purchaseDate?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>
                    {purchase.totalPurchaseAmount.toFixed(2)} TK
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#cef2e3] text-[#0ac074]">
                      {purchase.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell>{purchase.paidAmount} TK</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <button>
                        <Eye className="text-green-500 size-5 stroke-[2.8px]" />
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary"
                        asChild
                      >
                        <Link
                          to={`/admin/${purchase.purchaseId}/edit-purchase`}
                        >
                          <PenSquare strokeWidth={2.5} />
                        </Link>
                      </Button>{" "}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-100"
                        onClick={() =>
                          deleteConfirmation(
                            deletePurchase,
                            purchase.purchaseId
                          )
                        }
                      >
                        <Trash2 strokeWidth={2.8} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;
