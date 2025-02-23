import Loading from "@/components/shared/Loading";
import { useGetSingleEmployeeQuery } from "@/redux/api/admin/userManagement.api";
import { useGetAllAssignedBookQuery } from "@/redux/api/salesExecutive/assignedBook.api";
import { useAppSelector } from "@/redux/hooks";
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
import { TAssignedBook } from "./assigned-books.type";
const AssignedBooks = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: employeeData } = useGetSingleEmployeeQuery(user?.userID);
  const { data, isLoading } = useGetAllAssignedBookQuery(
    employeeData?.data?._id,

    { skip: !employeeData?.data?._id }
  );

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border overflow-x-scroll rounded-[16px] grid gap-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Book Stock</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-primary">Title</TableHead>
                <TableHead className="text-primary">Assigned Qty</TableHead>
                <TableHead className="text-primary">
                  Total Assigned Cost
                </TableHead>
                <TableHead className="text-primary">
                  Avg Assigned Cost
                </TableHead>
                <TableHead className="text-primary">
                  Remaining Assigned Qty
                </TableHead>
                <TableHead className="text-primary">Sold Qty</TableHead>
                <TableHead className="text-primary">Total Sales</TableHead>
                <TableHead className="text-primary">
                  Avg Selling Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((book: TAssignedBook) => (
                <TableRow key={book._id}>
                  <TableCell>{book.bookTitle}</TableCell>
                  <TableCell>{book.totalAssignedQuantity} pcs</TableCell>
                  <TableCell>{book.totalAssignedPrice} ৳</TableCell>
                  <TableCell>{book.avgAssignedPrice?.toFixed(2)} ৳</TableCell>
                  <TableCell>
                    {book.totalAssignedQuantity - book.totalQuantitySold} pcs
                  </TableCell>
                  <TableCell>{book.totalQuantitySold} pcs</TableCell>
                  <TableCell>{book.totalSoldPrice} ৳</TableCell>
                  <TableCell>{book.avgSellingPrice?.toFixed(2)} ৳</TableCell>
                  {/* <TableCell>{book.availableStock} pcs</TableCell> */}
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

export default AssignedBooks;
