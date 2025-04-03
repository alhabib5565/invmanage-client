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

import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";
import { useGetAllSalesQuery } from "@/redux/api/admin/sales.api";
import { TSales } from "./sales.type";
import SaleListActionDropdown from "./SaleListActionDropdown";

const SalesList = () => {
  const { data, isLoading } = useGetAllSalesQuery({});
  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-sales" />
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-end gap-4 ">
          <Input placeholder="Search..." className="w-fit" />
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Sales On</TableHead>
                <TableHead>Grand Total</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Paid Amount</TableHead>

                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((sale: TSales) => (
                <TableRow key={sale._id}>
                  <TableCell>
                    <span className="px-3 py-1 rounded bg-[#FDD4DA] text-sm text-[#F62951]">
                      {sale.salesId}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {sale.customer.name}
                  </TableCell>
                  <TableCell>{sale.warehouse.name}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {sale?.salesDate?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>{sale.totalSalesAmount.toFixed(2)} TK</TableCell>
                  <TableCell>
                    <Badge className="bg-[#cef2e3] text-[#0ac074]">
                      {sale.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell>{sale.paidAmount} TK</TableCell>
                  <TableCell>{sale.dueAmount?.toFixed(2)} TK</TableCell>
                  <TableCell>
                    <SaleListActionDropdown salesData={sale} />
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

export default SalesList;
