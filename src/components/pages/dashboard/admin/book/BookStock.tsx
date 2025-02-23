import Loading from "@/components/shared/Loading";
import { useGetBookStockQuery } from "@/redux/api/admin/book.api";

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
import { TBookStock } from "./book.type";
const BookStock = () => {
  const { data, isLoading } = useGetBookStockQuery({});

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] space-y-6">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Book Stock</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="relative h-[300px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead className="text-primary font-medium">ID</TableHead>
                <TableHead className="text-primary">Title</TableHead>
                <TableHead className="text-primary">Qty (Purchased)</TableHead>
                <TableHead className="text-primary">Total Cost</TableHead>
                <TableHead className="text-primary">Avg Cost</TableHead>
                <TableHead className="text-primary">
                  Remaining Assigned
                </TableHead>
                <TableHead className="text-primary ">Qty (Sold)</TableHead>
                <TableHead className="text-primary">Total Sales</TableHead>
                <TableHead className="text-primary">Avg Price</TableHead>
                <TableHead className="text-primary">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((book: TBookStock) => (
                <TableRow key={book._id}>
                  <TableCell>{book.bookID}</TableCell>
                  <TableCell>{book.bookTitle}</TableCell>
                  <TableCell>{book.totalPurchasedQuantity} pcs</TableCell>
                  <TableCell>{book.totalPurchasePrice} ৳</TableCell>
                  <TableCell>
                    {book.avgPurchasesPricePerUnit?.toFixed(2)} ৳
                  </TableCell>
                  <TableCell>{book.remainingAssignedBook} pcs</TableCell>
                  <TableCell>{book.totalSoldQuantity} pcs</TableCell>
                  <TableCell>{book.totalSoldPrice} ৳</TableCell>
                  <TableCell>
                    {book.avgSoldPricePerUnit?.toFixed(2)} ৳
                  </TableCell>
                  <TableCell>{book.availableStock} pcs</TableCell>
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

export default BookStock;
