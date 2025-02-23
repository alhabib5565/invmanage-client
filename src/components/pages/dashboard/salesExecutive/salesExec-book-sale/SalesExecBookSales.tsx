import { Button } from "@/components/ui/button";
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
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import { Link } from "react-router-dom";
import { useGetAllBookSalesQuery } from "@/redux/api/admin/bookSale.api";
import { TBookSale } from "../../admin/admin-book-sale/adminBookSale.type";
import { useAppSelector } from "@/redux/hooks";
import { useGetSingleEmployeeQuery } from "@/redux/api/admin/userManagement.api";
import { Edit, Trash2 } from "lucide-react";

const SalesExecBookSales = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: employeeData } = useGetSingleEmployeeQuery(user?.userID);
  const { data, isLoading } = useGetAllBookSalesQuery(
    {
      saleBy: employeeData?.data?._id,
    },
    { skip: !employeeData?.data?._id }
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] space-y-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Your all book sales</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className=" text-primary font-medium">
                  Sale ID
                </TableHead>
                <TableHead className="text-primary">Book Title</TableHead>
                <TableHead className="text-primary font-medium">
                  Quantity
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Unit Price
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Total Price
                </TableHead>

                <TableHead className="text-primary font-medium text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((bookSale: TBookSale) => (
                <TableRow key={bookSale._id}>
                  <TableCell>{bookSale.saleId}</TableCell>
                  <TableCell>{bookSale.book.bookTitle}</TableCell>
                  <TableCell>{bookSale.totalQuantitySold}</TableCell>
                  <TableCell>{bookSale.sellingPricePerUnit} TK</TableCell>

                  <TableCell>
                    {bookSale.totalQuantitySold * bookSale.sellingPricePerUnit}{" "}
                    TK
                  </TableCell>
                  <TableCell className="flex gap-4 justify-end">
                    <Link
                      // to={`/admin/${bookPurchase.parchaseBookId}/edit-book`}
                      to={"#"}
                    >
                      <Button className="px-3 py-1.5 gap-1 h-fit text-center  text-sm">
                        <Edit size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button className="px-3 py-1.5 gap-1 bg-red-600 hover:bg-red-500 h-fit text-sm">
                      <Trash2 size={14} />
                      Delete
                    </Button>
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

export default SalesExecBookSales;
