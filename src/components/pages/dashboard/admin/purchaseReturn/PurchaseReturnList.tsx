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
import { useGetAllPurchaseRetrunsQuery } from "@/redux/api/admin/purchaseReturn.api";
import { TPurchaseReturn } from "./purchaseReturn.type";
import { Eye } from "lucide-react";

const PurchaseReturnList = () => {
  const { data } = useGetAllPurchaseRetrunsQuery({});
  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-purchase-retrun" />
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-end gap-4 ">
          <Input placeholder="Search..." className="w-fit" />
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Return On</TableHead>
                <TableHead>Return Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((purchase: TPurchaseReturn) => (
                <TableRow key={purchase._id}>
                  <TableCell>
                    <span className="px-3 py-1 rounded bg-[#FDD4DA] text-sm text-[#F62951]">
                      {purchase.returnID}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {"purchase.supplier"}
                  </TableCell>
                  <TableCell>{"purchase.warehouse"}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {purchase?.returnDate?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>
                    {purchase.totalReturnAmount.toFixed(2)} TK
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <button>
                        <Eye className="text-green-500 size-5 stroke-[2.8px]" />
                      </button>
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

export default PurchaseReturnList;
