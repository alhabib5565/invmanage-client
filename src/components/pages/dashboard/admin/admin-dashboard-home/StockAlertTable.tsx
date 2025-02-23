import Loading from "@/components/shared/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBookStockQuery } from "@/redux/api/admin/book.api";
import { TBookStock } from "../book/book.type";
import { cn } from "@/lib/utils";

const StockAlertTable = () => {
  const { data, isLoading } = useGetBookStockQuery({});

  if (isLoading) return <Loading />;
  return (
    <div className="bg-white p-4 rounded-xl shadow border col-span-1 lg:col-span-3">
      <h3 className="text-xl mb-2">Stock Alert</h3>
      <hr />
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Stock</TableHead>
            <TableHead className="font-bold">Stock Status</TableHead>
            <TableHead className="font-bold">Alert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((book: TBookStock) => (
            <TableRow className="border-none" key={book._id}>
              <TableCell>{book.bookTitle}</TableCell>

              <TableCell>{book.availableStock} pcs</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "px-3 rounded-[12px] py-0.5 text-sm font-medium flex items-center gap-2 w-fit",
                    {
                      "text-[#12b76a] bg-[#e7f8f0]": book.availableStock >= 10, // In Stock (Green)
                      "text-[#ffa500] bg-[#fff8eb]":
                        book.availableStock > 0 && book.availableStock < 10, // Low Stock (Orange)
                      "text-[#ff4d4d] bg-[#ffe6e6]": book.availableStock === 0, // Out of Stock (Red)
                    }
                  )}
                >
                  <span
                    className={cn("size-1.5 p-0.5 rounded-full", {
                      "bg-[#12b76a]": book.availableStock >= 10, // In Stock
                      "bg-[#ffa500]":
                        book.availableStock > 0 && book.availableStock < 10, // Low Stock
                      "bg-[#ff4d4d]": book.availableStock === 0, // Out of Stock
                    })}
                  ></span>
                  {book.availableStock === 0
                    ? "Out of Stock"
                    : book.availableStock >= 10
                    ? "In Stock"
                    : "Low Stock"}
                </span>
              </TableCell>
              <TableCell>
                <span className="border border-red-500 rounded-md text-red-500 px-1">
                  10
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StockAlertTable;
